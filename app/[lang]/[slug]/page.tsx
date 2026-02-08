import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getAvailableLangs, getNoteBySlugWithFallback } from "@/lib/content";
import { remarkWikiLinks } from "@/lib/wikilinks";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Instagram, TikTok, Tweet } from "@/components/mdx-embeds";

const mdxComponents = {
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={1200}
        height={800}
        style={{ width: "100%", height: "auto" }}
      />
    );
  },
  Instagram,
  TikTok,
  Tweet,
};

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return getAvailableLangs().flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  return params.then(({ lang, slug }) => {
    const note = getNoteBySlugWithFallback(lang, slug);
    if (!note) return { title: "Not Found" };
    return {
      title: note.title,
      description: note.description,
    };
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const availableLangs = getAvailableLangs();
  if (!availableLangs.includes(lang)) return notFound();

  const note = getNoteBySlugWithFallback(lang, slug);
  if (!note) return notFound();

  const langLinks = availableLangs.map((l) => ({
    lang: l,
    href: `/${l}/${slug}`,
    label: l.toUpperCase(),
  }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 flex items-center justify-between gap-4">
        <Link href={`/${lang}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to notes
        </Link>
        <LanguageSwitcher currentLang={lang} links={langLinks} />
      </nav>

      <h1 className="text-3xl font-semibold">{note.title}</h1>
      <div className="mt-2 text-sm opacity-70">
        {note.date}
        {note.tags.length > 0 && <span> · {note.tags.join(", ")}</span>}
      </div>

      <article className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <MDXRemote
          source={note.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, [remarkWikiLinks, { basePath: `/${lang}` }]],
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </article>

      {note.backlinks.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Linked from</h2>
          <ul className="mt-3 space-y-1">
            {note.backlinks.map((s) => (
              <li key={s}>
                <Link href={`/${lang}/${s}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
