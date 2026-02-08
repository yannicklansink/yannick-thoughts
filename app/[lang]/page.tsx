import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotesWithFallback, getAvailableLangs } from "@/lib/content";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";

const projects = [
  {
    title: "TrashPulse",
    description: "How much sh!t is on the streets of Amsterdam.",
    image: "/images/project/Schermopname_8-2-2026_162418_amsterdam-trashpulse.vercel.app.jpeg",
    href: "https://amsterdam-trashpulse.vercel.app/?range=7d&view=trends",
  },
];

export function generateStaticParams() {
  return getAvailableLangs().map((lang) => ({ lang }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const availableLangs = getAvailableLangs();
  if (!availableLangs.includes(lang)) return notFound();

  const notes = getAllNotesWithFallback(lang).sort((a, b) => b.date.localeCompare(a.date));
  const langLinks = availableLangs.map((l) => ({
    lang: l,
    href: `/${l}`,
    label: l.toUpperCase(),
  }));

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
          <div className="mx-auto w-full max-w-3xl px-6 pb-6 flex items-end justify-between gap-4">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">Yannick</h1>
            <div className="pb-1">
              <LanguageSwitcher currentLang={lang} links={langLinks} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <section className="mb-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                Things I am building
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 shadow-[0_12px_40px_-30px_rgba(0,0,0,0.6)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 dark:border-gray-800/80 dark:bg-gray-900/60 sm:flex-row"
              >
                <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 sm:w-64 sm:flex-none">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <h2 className="text-2xl font-semibold">Notes</h2>
        <blockquote className="mt-4 border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400">
          <p>"Chaos is a ladder"</p>
          <cite className="text-sm not-italic">— Petyr "Littlefinger" Baelish</cite>
        </blockquote>

        <div className="mt-8 space-y-6">
          {notes.map((n) => (
            <div key={n.slug}>
              <Link href={`/${lang}/${n.slug}`} className="text-xl text-blue-600 dark:text-blue-400 hover:underline">
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

        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold">Inspiring Links</h2>
          <blockquote className="mt-4 border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400">
            <p>"Make something people want."</p>
            <cite className="text-sm not-italic">— Paul Graham</cite>
          </blockquote>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <a
                href="https://www.paulgraham.com/articles.html"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Paul Graham — Essays
              </a>
            </li>
            <li>
              <a
                href="https://news.ycombinator.com/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Hacker News
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
