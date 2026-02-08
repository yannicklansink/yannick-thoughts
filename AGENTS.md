# AGENTS.md

## Project
This is a Next.js App Router blog deployed on Vercel.

## Dev commands
- `npm run dev` — run local dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — lint

## Blog languages
The site is bilingual with language prefixes in the URL:
- English: `/en`
- Dutch: `/nl`

The root `/` redirects to `/en`.

## Content layout
Markdown posts live in per-language folders:
- English posts: `content/notes/en/*.md`
- Dutch posts: `content/notes/nl/*.md`

Post files are paired by slug. For example:
- `content/notes/en/first-post.md`
- `content/notes/nl/first-post.md`

Posts are rendered as MDX, so you can use React components inside `.md`/`.mdx` files.

## Routing
- Home: `app/[lang]/page.tsx`
- Post detail: `app/[lang]/[slug]/page.tsx`

## Language switching
The language switcher always links to the same slug in the other language:
- `/en/my-post` ↔ `/nl/my-post`

## Fallback behavior
If a post is missing in the requested language, the page falls back to English content.
This ensures `/nl/<slug>` still works even when only the English version exists.

## Content rules
- Posts are paired by slug across languages.
- Frontmatter required: `title`, `date`. Optional: `tags`, `description`.
- Use the same slug for both languages to keep the language switcher working.
- If only English exists, `/nl/<slug>` should still render via fallback.

## MDX embeds
MDX components available in posts: `<Instagram id="..." />`, `<TikTok id="..." />`, `<Tweet id="..." />`.

## Adding a new post
1. Create the English file in `content/notes/en/`.
2. Create the Dutch file in `content/notes/nl/` with the same slug.
3. Make sure frontmatter includes `title`, `date`, optional `tags`, `description`.
