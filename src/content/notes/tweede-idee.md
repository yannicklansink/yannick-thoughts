---
title: "Tweede idee"
date: 2026-01-24
tags: ["thoughts"]
description: "Backlinks maken alles beter."
---

Backlinks zijn als "sporen in sneeuw": je ziet waar je vandaan kwam.

Terug naar [[eerste-idee]].

## Wat zijn backlinks?

Wanneer pagina A linkt naar pagina B, dan heeft pagina B een backlink van pagina A. Deze backlinks zijn waardevol omdat ze:

1. Tonen welke ideeën gerelateerd zijn
2. Helpen bij het ontdekken van gerelateerde content
3. Geven context over hoe een idee wordt gebruikt

## In de praktijk

Op deze site zie je onderaan elke pagina een "Linked from" sectie. Daar staan alle paginas die naar deze pagina linken.

Probeer maar: ga naar [[eerste-idee]] en scroll naar beneden. Je zult zien dat deze pagina daar als backlink verschijnt.

## Code voorbeeld

Hier is hoe je backlinks zou kunnen opslaan in TypeScript:

```typescript
interface LinkIndex {
  backlinks: Map<string, string[]>;
  outgoing: Map<string, string[]>;
}

function buildLinkIndex(notes: Note[]): LinkIndex {
  const backlinks = new Map();
  const outgoing = new Map();

  for (const note of notes) {
    const links = extractWikiLinks(note.content);
    outgoing.set(note.slug, links);

    for (const targetSlug of links) {
      if (!backlinks.has(targetSlug)) {
        backlinks.set(targetSlug, []);
      }
      backlinks.get(targetSlug).push(note.slug);
    }
  }

  return { backlinks, outgoing };
}
```

Dit is de basis van hoe deze site werkt.
