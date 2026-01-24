import { getAllNotes } from "@/lib/content";

const SITE_URL = process.env.SITE_URL || "https://yannick-thoughts.com";

export async function GET() {
  const notes = getAllNotes().sort((a, b) => b.date.localeCompare(a.date));

  const items = notes
    .map(
      (note) => `
    <item>
      <title><![CDATA[${note.title}]]></title>
      <link>${SITE_URL}/${note.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${note.slug}</guid>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
      ${note.description ? `<description><![CDATA[${note.description}]]></description>` : ""}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yannick's Thoughts</title>
    <link>${SITE_URL}</link>
    <description>A digital garden of interconnected ideas</description>
    <language>nl</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
