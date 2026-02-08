import { getAllNotesWithFallback, getAvailableLangs } from "@/lib/content";

const SITE_URL = process.env.SITE_URL || "https://yannick-thoughts.com";

export async function GET() {
  const langs = getAvailableLangs();
  const notesByLang = langs.flatMap((lang) =>
    getAllNotesWithFallback(lang).map((note) => ({ ...note, lang }))
  );

  const urls = [
    `<url>
      <loc>${SITE_URL}/en</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`,
    ...langs.map(
      (lang) => `<url>
      <loc>${SITE_URL}/${lang}</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`
    ),
    ...notesByLang.map(
      (note) => `<url>
      <loc>${SITE_URL}/${note.lang}/${note.slug}</loc>
      <lastmod>${note.date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n  ")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
