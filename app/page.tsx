import Link from "next/link";
import { getAllNotes } from "@/lib/content";

export default function HomePage() {
  const notes = getAllNotes().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Notes</h1>
      <blockquote className="mt-4 border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400">
        <p>"Chaos is a ladder"</p>
        <cite className="text-sm not-italic">— Petyr "Littlefinger" Baelish</cite>
      </blockquote>

      <div className="mt-8 space-y-6">
        {notes.map((n) => (
          <div key={n.slug}>
            <Link href={`/${n.slug}`} className="text-xl text-blue-600 dark:text-blue-400 hover:underline">
              {n.title}
            </Link>
            <div className="text-sm opacity-70">{n.date}</div>
            {n.description && <p className="mt-1">{n.description}</p>}
            {n.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {n.tags.map((t) => (
                  <span key={t} className="rounded border px-2 py-0.5 opacity-70">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
