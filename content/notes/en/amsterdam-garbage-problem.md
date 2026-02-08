---
title: "The Garbage Problem No One Wants to Talk About"
date: 2026-02-08
tags: ["amsterdam", "governance", "waste", "urban"]
description: "Why Amsterdam's waste crisis is a window into urban governance failure."
---

*Why Amsterdam's waste crisis is a window into urban governance failure*

---

## The Data Tells a Story

In 2024, residents of Amsterdam filed **159,528 complaints** about waste; overflowing containers, illegal dumping, trash piling up on sidewalks. That's 17 reports per 100 inhabitants, up from 14 the year before. Roughly **120 complaints per day** about improperly disposed bulk waste alone.

Scroll through [Instagram](https://www.instagram.com/reel/DMs-h6KIoGy/) or [TikTok](https://www.tiktok.com/@sorry72636/video/7547043400135052566) and you'll see what these numbers look like on the ground: mountains of garbage bags next to underground containers, furniture abandoned on street corners, rats scurrying through restaurant districts.

<Instagram id="DMs-h6KIoGy" kind="reel" />

<TikTok id="7547043400135052566" />

This isn't a developing-world problem. This is Amsterdam — one of the wealthiest, most tourist-heavy cities in Europe.

---

## A System Under Stress

The [Monitor Afval en Reiniging 2025](https://onderzoek.amsterdam.nl/publicatie/monitor-afval-en-reiniging-2025), the city's own assessment report, reads like an autopsy:

- Only **one-third** of Amsterdam residents consider their neighborhood clean
- In the city center, **two in five residents** call their area dirty or very dirty
- Rat complaints rose to **6,800+** in 2024
- Reports about litter increased by 10,000 year-over-year

The municipality's response has been predictable: more enforcement. The city now employs **53 waste inspectors** (up from 14 in 2020) and issued over **11,000 fines** last year. Penalties run €110 for individuals, €550 for businesses, scaling up to €2,500 for repeat offenders.

Yet as [NOS reported](https://nos.nl/artikel/2591503-ook-met-hoge-boetes-krijgt-amsterdam-het-afvalmonster-er-niet-onder): "Even with high fines, Amsterdam can't get the waste monster under control."

---

## The Multi-Headed Problem

[AT5 called it](https://www.at5.nl/artikelen/235623/het-veelkoppige-afvalmonster-waarom-boetes-alleen-de-stad-niet-schoon-krijgen) "the multi-headed waste monster" — and the metaphor is apt. This isn't a single failure. It's a system breaking down at multiple points simultaneously.

**Infrastructure mismatch.** Amsterdam's historic urban density leaves little room for modern waste separation. The city produces just **4 kg of organic waste per capita** — the lowest of any major Dutch city. There's simply nowhere to put the bins.

**Tourism load.** Millions of annual visitors generate waste in areas where collection infrastructure was designed for residential use. The Centrum district consistently scores worst on cleanliness metrics.

**Labor crisis.** Sick leave at the municipal sanitation department runs at **14.8%** for street sweepers and **17%** for garbage collectors. The sector average is 6.3%. In May 2024, 214 employees sent a formal complaint letter to the King's Commissioner about working conditions.

**Behavioral economics.** When containers overflow, even well-intentioned residents place bags next to them. That triggers a cascade — if others are doing it, the norm shifts. Fines don't change norms; they create resentment and a cottage industry of people cutting labels off their garbage.

---

## What Open Data Reveals

Amsterdam publishes all waste complaints through its [open data portal](https://api.data.amsterdam.nl/). Most citizens never see this data. It sits in JSON endpoints, accessible to developers but invisible to the public whose tax money funds the cleanup.

I built [a visualization tool](https://amsterdam-trashpulse.vercel.app/) to make this data legible. Not to solve the problem — that requires political will and institutional reform — but to make the scale visible.

Some patterns emerge:

- **Temporal clustering.** Most complaints come in on weekdays between 10:00 and 16:00. This suggests residents reporting issues they encounter during daily routines, not weekend party aftermath.
- **Geographic concentration.** Hotspots are predictable: areas with high foot traffic, dense housing, and older infrastructure. The same blocks appear month after month.
- **Seasonal variation.** Summer months show spikes, correlating with tourism and outdoor activity.

None of this is surprising. But seeing it mapped in real-time makes abstract statistics concrete.

---

## The Governance Question

The city has committed **€13 million** in additional funding. Starting 2026, bulk waste pickup will be by appointment only. The [Kader Schoon en Afvalvrij 2025-2028](https://openresearch.amsterdam/image/2024/10/14/schoon_en_afvalvrij_kader.pdf) policy framework was adopted in December 2024.

Whether this works depends on something harder to legislate: trust.

The [Rekenkamer Amsterdam](https://www.rekenkamer.amsterdam.nl/onderzoek/grof-afval/) (the city's audit office) found that the municipality doesn't actually know what bulk waste collection costs. Their estimate: **€34 million annually**, but they can't verify it. Of 21 general waste policy goals, only 8 have been partially achieved for bulk waste.

Meanwhile, [internal dysfunction](https://www.at5.nl/nieuws/234295/zieken-onvrede-en-hoge-werkdruk-hoe-door-problemen-bij-de-reiniging-de-stad-steeds-viezer-wordt) at the sanitation department continues. Workers describe being shuffled between districts daily, unable to build familiarity with routes. Management struggles with an aging workforce (average age: 50 for collectors, 46 for cleaners) and chronic understaffing.

---

## The Broader Pattern

Amsterdam's waste crisis is a case study in how wealthy cities can fail at basic services while excelling at symbolic politics.

The city has climate targets, sustainability reports, circular economy ambitions. It hosts conferences on urban innovation. It markets itself as a model of progressive governance.

And yet: the streets are dirty, the workers are burned out, and residents are angrier each year. Only housing generates more complaints than garbage.

This gap between aspiration and execution isn't unique to Amsterdam. It's a pattern across Western cities that have prioritized policy frameworks over operational capacity, measurement over management, announcements over accountability.

Open data can't fix this. But it can make the gap harder to ignore.

---

**Explore the data:** [amsterdam-trashpulse.vercel.app](https://amsterdam-trashpulse.vercel.app/)

---

### Sources

- [NOS - Ook met hoge boetes krijgt Amsterdam het afvalmonster er niet onder](https://nos.nl/artikel/2591503-ook-met-hoge-boetes-krijgt-amsterdam-het-afvalmonster-er-niet-onder)
- [AT5 - Het veelkoppige afvalmonster](https://www.at5.nl/artikelen/235623/het-veelkoppige-afvalmonster-waarom-boetes-alleen-de-stad-niet-schoon-krijgen)
- [AT5 - Zieken, onvrede en hoge werkdruk bij Stadsreiniging](https://www.at5.nl/nieuws/234295/zieken-onvrede-en-hoge-werkdruk-hoe-door-problemen-bij-de-reiniging-de-stad-steeds-viezer-wordt)
- [Monitor Afval en Reiniging 2025 - Gemeente Amsterdam](https://onderzoek.amsterdam.nl/publicatie/monitor-afval-en-reiniging-2025)
- [Rekenkamer Amsterdam - Onderzoek Grof Afval](https://www.rekenkamer.amsterdam.nl/onderzoek/grof-afval/)
- [Kader Schoon en Afvalvrij 2025-2028](https://openresearch.amsterdam/image/2024/10/14/schoon_en_afvalvrij_kader.pdf)
