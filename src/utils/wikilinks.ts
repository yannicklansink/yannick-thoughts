import { getCollection } from 'astro:content';

export interface LinkIndex {
  // Maps slug -> array of slugs that link TO it (backlinks)
  backlinks: Map<string, string[]>;
  // Maps slug -> array of slugs that it links TO (outgoing)
  outgoing: Map<string, string[]>;
}

// Extract all [[slug]] references from markdown content
export function extractWikiLinks(content: string): string[] {
  const wikiLinkPattern = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;

  while ((match = wikiLinkPattern.exec(content)) !== null) {
    links.push(match[1]);
  }

  return links;
}

// Transform [[slug]] to <a href="/slug">slug</a>
export function transformWikiLinks(html: string): string {
  return html.replace(/\[\[([^\]]+)\]\]/g, '<a href="/$1" class="wiki-link">$1</a>');
}

// Build the complete link index for all notes
export async function buildLinkIndex(): Promise<LinkIndex> {
  const notes = await getCollection('notes');
  const backlinks = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();

  // Initialize all slugs
  for (const note of notes) {
    backlinks.set(note.id, []);
    outgoing.set(note.id, []);
  }

  // Process each note's content
  for (const note of notes) {
    const links = extractWikiLinks(note.body);
    outgoing.set(note.id, links);

    // Add backlinks
    for (const targetSlug of links) {
      if (!backlinks.has(targetSlug)) {
        backlinks.set(targetSlug, []);
      }
      backlinks.get(targetSlug)!.push(note.id);
    }
  }

  return { backlinks, outgoing };
}

// Get backlinks for a specific note
export async function getBacklinksForNote(slug: string): Promise<Array<{ slug: string; title: string }>> {
  const linkIndex = await buildLinkIndex();
  const backlinkSlugs = linkIndex.backlinks.get(slug) || [];

  const notes = await getCollection('notes');
  const notesMap = new Map(notes.map(n => [n.id, n]));

  return backlinkSlugs
    .map(slug => {
      const note = notesMap.get(slug);
      return note ? { slug, title: note.data.title } : null;
    })
    .filter((item): item is { slug: string; title: string } => item !== null);
}
