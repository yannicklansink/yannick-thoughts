import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

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

export function getAllRawNotes() {
  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const full = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
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

export function getAllNotes(): Note[] {
  const raws = getAllRawNotes();
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

export function getNoteBySlug(slug: string): Note | null {
  return getAllNotes().find((n) => n.slug === slug) ?? null;
}

export function getBacklinks(slug: string): string[] {
  const note = getNoteBySlug(slug);
  return note?.backlinks ?? [];
}
