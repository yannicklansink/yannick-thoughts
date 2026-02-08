import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");
const DEFAULT_LANG = "en";

export function getAvailableLangs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return ["en"];
  const langs = fs
    .readdirSync(NOTES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  return langs.length > 0 ? langs : ["en"];
}

function getNotesDir(lang: string) {
  return path.join(NOTES_DIR, lang);
}

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
};

export type Note = NoteMeta & {
  content: string;
  outgoing: string[];
  backlinks: string[];
};

const WIKI_RE = /\[\[([a-zA-Z0-9-_\/]+)\]\]/g;

function extractOutgoing(md: string): string[] {
  const out = new Set<string>();
  for (const m of md.matchAll(WIKI_RE)) {
    out.add(m[1]);
  }
  return [...out];
}

export function getAllRawNotes(lang: string) {
  const langDir = getNotesDir(lang);
  if (!fs.existsSync(langDir)) return [];

  const files = fs
    .readdirSync(langDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const full = fs.readFileSync(path.join(langDir, file), "utf8");
    const { data, content } = matter(full);

    // Parse date to ISO format (YYYY-MM-DD)
    let dateStr = "1970-01-01";
    if (data.date) {
      const d = data.date instanceof Date ? data.date : new Date(data.date);
      dateStr = d.toISOString().split("T")[0];
    }

    const meta: NoteMeta = {
      slug,
      title: String(data.title ?? slug),
      date: dateStr,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      description: data.description ? String(data.description) : undefined,
    };

    const outgoing = extractOutgoing(content);
    return { meta, content, outgoing };
  });
}

export function getAllNotes(lang: string): Note[] {
  const raws = getAllRawNotes(lang);
  const backlinksMap = new Map<string, Set<string>>();

  for (const r of raws) {
    for (const target of r.outgoing) {
      if (!backlinksMap.has(target)) {
        backlinksMap.set(target, new Set());
      }
      backlinksMap.get(target)!.add(r.meta.slug);
    }
  }

  return raws.map((r) => ({
    ...r.meta,
    content: r.content,
    outgoing: r.outgoing,
    backlinks: [...(backlinksMap.get(r.meta.slug) ?? new Set())],
  }));
}

export function getNoteBySlug(lang: string, slug: string): Note | null {
  return getAllNotes(lang).find((n) => n.slug === slug) ?? null;
}

export function getBacklinks(lang: string, slug: string): string[] {
  const note = getNoteBySlug(lang, slug);
  return note?.backlinks ?? [];
}

export function getAllSlugs(): string[] {
  const slugs = new Set<string>();
  for (const lang of getAvailableLangs()) {
    for (const note of getAllNotes(lang)) {
      slugs.add(note.slug);
    }
  }
  return [...slugs];
}

export function getAllNotesWithFallback(lang: string, fallbackLang: string = DEFAULT_LANG): Note[] {
  const slugs = getAllSlugs();
  return slugs
    .map((slug) => getNoteBySlug(lang, slug) ?? getNoteBySlug(fallbackLang, slug))
    .filter((n): n is Note => Boolean(n));
}

export function getNoteBySlugWithFallback(
  lang: string,
  slug: string,
  fallbackLang: string = DEFAULT_LANG
): Note | null {
  return getNoteBySlug(lang, slug) ?? getNoteBySlug(fallbackLang, slug);
}
