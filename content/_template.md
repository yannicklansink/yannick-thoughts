---
title: "Titel van je post"
date: 2026-01-24
tags: ["tag1", "tag2", "tag3"]
description: "Korte beschrijving voor SEO en previews (max ~160 karakters)."
---

## Basis Markdown

Gewone tekst met **bold**, *italic*, en ***bold italic***.

Je kunt ook ~~doorgestreepte tekst~~ gebruiken.

### Links

- Externe link: [Google](https://google.com)
- Wiki-link naar andere post: [[eerste-idee]]
- Wiki-link voorbeeld 2: [[tweede-idee]]

### Lijsten

Ongeordende lijst:
- Item een
- Item twee
  - Genest item
  - Nog een genest item
- Item drie

Geordende lijst:
1. Eerste stap
2. Tweede stap
3. Derde stap

### Takenlijst (GFM)

- [x] Taak voltooid
- [ ] Taak nog te doen
- [ ] Nog een taak

## Quotes

> Dit is een blockquote.
> Kan meerdere regels bevatten.
>
> — Auteur naam

## Code

Inline code: `const x = 42;`

Code block met syntax highlighting:

```typescript
type Note = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

function getNote(slug: string): Note | null {
  return notes.find(n => n.slug === slug) ?? null;
}
```

```javascript
// JavaScript voorbeeld
const greeting = (name) => `Hello, ${name}!`;
console.log(greeting("World"));
```

```python
# Python voorbeeld
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```bash
# Shell commando's
npm install
npm run dev
```

## Tabellen (GFM)

| Kolom 1 | Kolom 2 | Kolom 3 |
|---------|:-------:|--------:|
| Links   | Midden  | Rechts  |
| Data    | Data    | Data    |
| Meer    | Meer    | Meer    |

## Afbeeldingen

Afbeelding uit public/images folder:

![Alt tekst beschrijving](/images/voorbeeld.png)

## Horizontale lijn

---

## Voetnoten stijl

Tekst met een referentie[^1].

[^1]: Dit is de voetnoot tekst.

## Tips voor goede posts

1. **Houd titels kort** - Max 60 karakters voor SEO
2. **Gebruik description** - Wordt getoond in previews en zoekmachines
3. **Link naar andere posts** - Gebruik `[[slug]]` voor interne wiki-links
4. **Tags consistent** - Gebruik dezelfde tags voor gerelateerde posts
5. **Datum formaat** - Altijd YYYY-MM-DD

## Backlinks

Posts die naar deze post linken verschijnen automatisch onderaan in de "Linked from" sectie.
