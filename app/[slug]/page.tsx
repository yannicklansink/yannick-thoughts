import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import Link from "next/link";
import { getAllNotes, getNoteBySlug } from "@/lib/content";
import { remarkWikiLinks } from "@/lib/wikilinks";

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const note = getNoteBySlug(slug);
    if (!note) return { title: "Not Found" };
    return {
      title: note.title,
      description: note.description,
    };
  });
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8">
        <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to notes
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">{note.title}</h1>
      <div className="mt-2 text-sm opacity-70">
        {note.date}
        {note.tags.length > 0 && <span> · {note.tags.join(", ")}</span>}
      </div>

      <article className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkWikiLinks]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            img: ({ src, alt }) => {
              if (!src || typeof src !== "string") return null;
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
          }}
        >
          {note.content}
        </ReactMarkdown>
      </article>

      {note.backlinks.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Linked from</h2>
          <ul className="mt-3 space-y-1">
            {note.backlinks.map((s) => (
              <li key={s}>
                <Link href={`/${s}`} className="text-blue-600 dark:text-blue-400 hover:underline">
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
