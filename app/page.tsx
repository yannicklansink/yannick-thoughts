import Link from "next/link";
import { getAllNotes } from "@/lib/content";

export default function HomePage() {
  const notes = getAllNotes().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* Header with power law curve */}
      <header className="relative h-[30vh] min-h-[200px] w-full overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-rose-600 dark:from-orange-900 dark:via-red-900 dark:to-rose-900" />

        {/* Light glow at the "head" - where power concentrates */}
        <div className="absolute -left-10 -top-10 h-[80%] w-[35%] rounded-full bg-white/20 blur-3xl" />

        {/* The power law curve */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="40%" stopColor="white" stopOpacity="0.3" />
              <stop offset="70%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Bold main curve */}
          <path
            d="M 0 8
               C 8 8, 12 25, 15 40
               C 20 60, 30 78, 50 88
               C 70 95, 85 98, 100 100"
            fill="none"
            stroke="url(#curveFlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Subtle echo curve */}
          <path
            d="M 0 18
               C 10 18, 16 35, 20 50
               C 26 68, 38 84, 58 92
               C 75 97, 90 99, 100 100"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-3xl px-6 pb-6">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">Yannick</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="text-2xl font-semibold">Notes</h2>
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
    </>
  );
}
