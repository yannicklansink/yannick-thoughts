import Link from "next/link";

type LanguageLink = {
  lang: string;
  href: string;
  label: string;
};

type LanguageSwitcherProps = {
  currentLang: string;
  links: LanguageLink[];
};

export default function LanguageSwitcher({ currentLang, links }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {links.map((l) => (
        <Link
          key={l.lang}
          href={l.href}
          className={
            l.lang === currentLang
              ? "rounded border px-2 py-1 text-gray-900 dark:text-gray-100"
              : "rounded border border-transparent px-2 py-1 text-blue-600 dark:text-blue-400 hover:underline"
          }
          aria-current={l.lang === currentLang ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
