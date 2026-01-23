import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes');
  const sortedNotes = notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Thoughts',
    description: 'Personal notes and ideas',
    site: context.site || 'https://yannick-thoughts.com',
    items: sortedNotes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.date,
      link: `/${note.id}/`,
      categories: note.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
