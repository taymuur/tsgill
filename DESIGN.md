# DESIGN.md — Taimur Shahzad Gill · Portfolio

> A design blueprint for a fully interactive personal research portfolio.
> Built from a Level-7 "design extraction" pass: identify the person's real
> through-line, turn it into a visual language, then engineer the experience
> around it.

---

## 0. How to read this document

This is the single source of truth for the redesign. It defines **the idea**,
**the tech stack**, **the design system**, **the page architecture**, and **the
signature interactive pieces** — enough that a developer (or an agent) can build
the site without guessing. Sections are ordered from concept → concrete.

Two honesty notes up front:

- This blueprint is derived entirely from your **academic CV** and the **existing
  `al-folio` repository** (projects, publications, news, socials). I don't have
  access to your other Claude conversations, so nothing here is invented from
  memory — every claim, number, and project maps to a source in this repo.
- The current repo is a Jekyll/`al-folio` template. This design **replaces** it
  with a bespoke build. We keep the _data_ (your papers, project write-ups,
  headshot) and discard the _template_.

---

## 1. The core idea — one sentence

> **You take complex, mixed signals and resolve them into the interpretable
> parts that actually explain the phenomenon.**

Look at what your work actually _is_, across every field you've touched:

| Domain        | The mixed signal | Resolved into…                        | Project                        |
| ------------- | ---------------- | ------------------------------------- | ------------------------------ |
| Neuroscience  | Raw EEG          | 7 seizure types (attention)           | MHA-CNN, _Epilepsy & Behavior_ |
| Genomics      | Bulk RNA-seq     | Cell-type proportions (deconvolution) | Crohn's dissertation, Earlham  |
| Epidemiology  | Time series      | Seasonal cycles (Complex EMD)         | SFTS, Nixon Group              |
| Public health | Flu counts       | Forecasted horizon                    | TimeGPT surveillance           |
| Finance       | Price series     | Trend + memory                        | ESN-LSTM, KSE-100              |

This is not a coincidence — it's your **research identity**. Whether the input is
a voltage trace, a transcriptome, or an epidemic curve, you are doing the same
intellectual move: **decomposition into interpretable structure**. Every reviewer,
recruiter, and PhD supervisor who lands on this site should feel that unifying
thesis in the first five seconds, before they read a single word.

**The whole site is a demonstration of that thesis.** The hero literally performs
a deconvolution. The navigation resolves. The section transitions separate a
blurred whole into clean parts. Form _is_ the argument.

Tagline candidates (pick one, use consistently):

- **"From signals to cells."**
- **"Resolving complex data into the parts that explain it."**
- **"I turn mixed signals into interpretable biology."**

---

## 2. Who this is for (audience → design consequence)

| Visitor                | What they need in 30 seconds         | Design consequence                                                                               |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| PhD supervisor / PI    | Rigor, real methods, reproducibility | Show _actual_ methods (CIBERSORTx, MuSiC, Bisque, CATD, EISCA), link data (GEO IDs), cite papers |
| Recruiter (biotech/DS) | Impact, breadth, "can they ship"     | Metrics up top: 4 first-author papers, 98.4%, 1,310+ research hours, H-index 3                   |
| Fellow researcher      | Papers, code, methods to reuse       | One-click to Scholar, ORCID, GitHub, ResearchGate; interactive figures                           |
| Curious generalist     | The story, made legible              | Narrative scroll, illustration, plain-language captions on every viz                             |

The design has to satisfy the specialist _and_ the generalist simultaneously.
The pattern for that: **interactive visual up front, expandable rigor beneath.**
Never force the expert to scroll past fluff; never make the generalist decode
jargon unaided.

---

## 3. Tech stack (firm recommendation)

The brief asks for "one of the best experiences" with heavy interactivity, 3D,
real data viz, and art. That rules out a static template and points to a
component-driven React stack with first-class animation and WebGL. Firm picks:

### Core

- **Next.js 15 (App Router) + TypeScript** — SSG/ISR for SEO (critical for an
  academic — Scholar, ORCID, and search need clean server-rendered HTML and
  metadata), file-based routing, `next/image` optimization, MDX support, and the
  Vercel deploy path. This is the safe, rich default for an interactive portfolio.
- **Tailwind CSS v4** — design tokens as CSS variables, fast iteration, keeps the
  design system in one place (Section 4).
- **shadcn/ui** (Radix under the hood) — accessible, unstyled-then-themed
  primitives (dialog, tabs, tooltip, accordion). Own the code, no runtime lock-in.

### Motion & 3D

- **Motion (Framer Motion)** — component enter/exit, layout animations, shared
  element transitions between pages.
- **GSAP + ScrollTrigger** — the scroll-driven storytelling (the hero
  deconvolution, pinned sections, the journey timeline). GSAP is the right tool
  for choreographed, scrubbed scroll sequences.
- **React Three Fiber + drei + Three.js** — the hero point-cloud ("single cells")
  and any GPU-particle work. R3F keeps the 3D declarative and React-native.
- **Lenis** — smooth inertial scroll that plays nicely with ScrollTrigger.

### Data visualization

- **visx** (D3 scales + React rendering) or raw **D3** for the bespoke figures:
  deconvolution stacked bars, EEG traces + attention heatmap, forecast curves,
  EMD decomposition. These are your _real results_, not decoration — they deserve
  purpose-built SVG/Canvas, not a charting library's defaults.
- Follow the repo's **dataviz** conventions for palette/legends (one visual
  system across every figure).

### Content

- **MDX** for case studies and blog posts — prose with embedded live components
  (drop an interactive figure straight into a paragraph).
- **Content collections** via a typed content layer (e.g. `content-collections`
  or Contentlayer-style) so projects/papers/posts are strongly typed data.

### Tooling & deploy

- **Vercel** (preview deploys per PR, edge, analytics), **pnpm**, **ESLint +
  Prettier**, **Playwright** for a couple of smoke tests on the interactive routes.
- **Plausible** or Vercel Analytics for privacy-friendly stats.

### The lean alternative (documented, not chosen)

If build simplicity ever outweighs interactivity, **Astro + React islands** gives
better static performance with less JS. We're _not_ choosing it because the hero
3D, cross-page shared-element transitions, and scrubbed scroll sequences are
first-class in the Next.js + GSAP + R3F combination and fought against Astro's
island model. Revisit only if performance budgets (Section 11) can't be met.

---

## 4. Design system

The system encodes the thesis: **cool = data/biology, warm = signal/engineering**,
resolving out of a dark, instrument-like ground.

### 4.1 Color

Dark-first (an oscilloscope / microscope-in-a-dark-room feel), with a fully
worked light mode.

```
/* Ground */
--ink-900:  #0A0E17;  /* page base, near-black navy */
--ink-800:  #10151F;  /* raised surfaces / cards */
--ink-700:  #1A2130;  /* borders, hairlines */
--mist-100: #E8EDF4;  /* primary text on dark */
--mist-400: #9AA7BD;  /* secondary text */

/* Biology / data — cool, the "resolved cells" */
--cell-400: #35E0C2;  /* bioluminescent teal — primary accent */
--cell-600: #14B8A6;
--cell-300: #7FF3DE;  /* glow / highlights */

/* Signal / engineering — warm, the "spark" */
--signal-400: #FF8A5B; /* coral-amber — secondary accent */
--signal-300: #FFB08A;

/* Categorical (for UMAP clusters & multi-series charts) */
--c1:#35E0C2  --c2:#7C9CFF  --c3:#FF8A5B  --c4:#B98CFF
--c5:#4ED8FF  --c6:#FFD166  --c7:#F871A0  --c8:#8CE28C
```

Rules:

- **One accent per surface.** Teal leads; coral is a punctuation color (a single
  CTA, a live metric, a hover). Never a teal/coral 50–50 split.
- Categorical palette is reserved for **cluster/series identity** and stays
  consistent everywhere a given cell type or model appears (validate contrast per
  the `dataviz` skill).
- Light mode: invert to a **warm paper** ground (`#FAF8F4`), ink text, same two
  accents at higher saturation. Both themes are stamped via
  `prefers-color-scheme` **and** a manual toggle (`data-theme`).

### 4.2 Typography

Three voices — gravitas, clarity, instrumentation.

- **Display / headlines:** **Fraunces** (variable, optical size) — an academic,
  expressive serif that signals scholarship without stuffiness. Used large,
  tight leading, for section titles and the hero name.
- **Body / UI:** **Inter** (or **Geist**) — neutral grotesk, superb at small
  sizes, the workhorse for prose and controls.
- **Data / captions / code:** **JetBrains Mono** (or **Geist Mono**) — every
  metric, axis label, GEO ID, and code snippet. The mono voice _is_ the "lab
  instrument" texture; use it deliberately for numbers (`RMSE 873.27`,
  `R² = 0.848`, `GSE57945`).

Scale (fluid, `clamp()`): 12 · 14 · 16 · 18 · 21 · 28 · 40 · 56 · 80 · 112.
Body 18px, generous 1.6 line-height, `max-width: 68ch` for prose.

### 4.3 Space, grid, form

- 8px spacing base; section rhythm in multiples (96/128/160 vertical).
- 12-column grid, 1200px max content, full-bleed allowed for hero/viz.
- **Radius:** cards 16px, insets 10px, pills full.
- **Hairlines over boxes:** 1px `--ink-700` borders and generous whitespace
  instead of heavy fills — reads scientific, not corporate.
- **Grain + glow:** a very subtle noise overlay + soft accent bloom behind key
  elements to avoid flat-dark sterility.

### 4.4 Motion principles

1. **Motion means resolution.** Things arrive by _separating out of blur/noise_
   into sharp, ordered parts — never a generic slide-in. Decompose, don't decorate.
2. **Scrub, don't autoplay.** Signature sequences are tied to scroll so the user
   controls the pace (and it degrades gracefully).
3. **Fast in, calm settle.** 200–400ms UI transitions, custom ease
   (`cubic-bezier(0.22, 1, 0.36, 1)`).
4. **Respect `prefers-reduced-motion`** — swap every scrubbed/particle sequence
   for a static, still-beautiful final frame.

---

## 5. Information architecture

```
/                Home — hero deconvolution + narrative scroll + highlights
/research        The through-line: the "decomposition" thesis, methods, current work
/projects        8 case studies, filterable by domain (genomics · signals · forecasting · systems)
/projects/[slug] Individual case study with its live interactive figure
/publications    4 first-author papers, citations, links (Scholar/ORCID/DOI)
/journey         The arc: interactive timeline + world map (Islamabad → Stuttgart → Liverpool → Norwich)
/writing         Blog / notes (the 5 existing posts, MDX)
/cv              Interactive CV + PDF download
/contact         Email, socials, "who I'd like to hear from"
```

Global nav is minimal (Research · Projects · Publications · Journey · CV) with a
persistent theme toggle and a "Get in touch" pill. Page transitions use a
**shared-element + decompose** effect (the outgoing page's grid separates into
strips that clear to reveal the next).

---

## 6. Page-by-page

### 6.1 Home

**Hero — "Deconvolution" (the signature moment).**
A full-viewport **WebGL point cloud** of ~15–20k points (R3F, GPU-instanced).
On load the points sit as one indistinct **bulk blob** softly pulsing. As the
user scrolls (or after 1.5s on load), the blob **resolves into ~7 labelled
clusters** — a UMAP-like embedding of "cell types." This is your dissertation,
made kinetic: bulk → deconvolved cell types. Overlaid:

- `Taimur Shahzad Gill` (Fraunces, large)
- `Computational Biologist · Earlham Institute · University of East Anglia`
- One line of thesis (Section 1 tagline)
- A quiet scroll cue

Reduced-motion / no-WebGL fallback: a crisp static render of the resolved
clusters as an SVG.

**Metric band.** A tight mono row of the numbers that earn trust:
`4 first-author papers · 98.4% seizure accuracy · 24+ citations · H-index 3 ·
1,310+ research hours`. Each counts up once on view.

**Narrative scroll.** 4–5 pinned panels that state the thesis with a live micro-viz
each (EEG→types, bulk→cells, series→cycles). Plain-language left, rigorous mono
caption right.

**Featured work.** 3–4 project cards (the strongest: MHA-CNN, Crohn's/Earlham,
TimeGPT, SFTS) with a hover that previews the interactive figure.

**Now.** A short "currently" block pulled from `_news` (Earlham Nov 2025, MSc at
UEA) — keeps the site alive.

### 6.2 Research (the thesis page)

The intellectual heart. Structured as the argument:

1. **The move** — decomposition into interpretable structure (with the Section-1
   table rendered as an interactive grid; click a row → its live figure).
2. **Current work** — Crohn's disease dissertation at Earlham: integrating bulk +
   single-cell RNA-seq across `GSE57945`, `GSE93624`, `GSE192786`; benchmarking
   **CIBERSORTx / MuSiC / Bisque** in the **CATD** pipeline; **EISCA** for
   single-cell QC→annotation; ML on deconvolved proportions + clinical metadata.
3. **Methods I work in** — a scannable mono list (deconvolution, multi-omics
   integration, attention/transformers, EMD, harmonic regression, SHAP).
4. **How I work** — reproducibility, FAIR, version control, HPC. This matters to
   PIs; give it real estate.

### 6.3 Projects (index + case studies)

Filter chips by domain: **Genomics · Signals · Forecasting · Systems**. Each of
the 8 projects becomes a case study with a **live figure** (Section 7), a
methods block, results table, and links (paper/DOI/code). Map from existing repo:

`1_epilepsy_seizure` · `2_kneevit_mri` · `3_hybrid_esn_lstm` ·
`4_timegpt_influenza` · `5_iot_power_theft` · `6_eeg_acquisition` ·
`7_mesothelioma_ml` · `8_sfts_seasonal`.

Keep the real numbers (98.4%, AUC 0.919, R²=0.975, RMSE 873.27, R²=0.848, 18
citations) — they're the substance.

### 6.4 Publications

The 4 first-author papers as rich entries: title, venue (_Epilepsy & Behavior_
155:109732; ICRAI 2024; _Engineering Proceedings_ 46(1):6; ICET 2021), year,
one-line contribution, and buttons to **DOI · Scholar · ORCID (0000-0003-2467-1688)
· ResearchGate**. Sort/filter by year and type (journal vs. proceedings). A small
citations sparkline if data allows.

### 6.5 Journey

Two linked pieces:

- **World map** with an animated great-circle path **Islamabad (NUST) → Stuttgart
  (AddiTechSim) → Liverpool (Nixon Group) → Norwich (UEA + Earlham)**. Pins expand
  to what happened there.
- **Vertical timeline** (2019 → present) merging education, research posts, and
  the `_news` milestones. This is where the _human_ arc lives — EE undergrad in
  Pakistan to single-cell genomics in the UK.

### 6.6 Writing, CV, Contact

- **Writing:** the 5 existing posts in MDX; embed live figures where relevant.
- **CV:** interactive, expandable sections + a prominent **Download PDF**
  (the attached CV) button; keep it in sync with the data model.
- **Contact:** email (`taimuur.shahzad@gmail.com`), GitHub `taymuur`, LinkedIn
  `taimur-shahzad-gill`, Scholar, ORCID, ResearchGate — and a sentence on who
  you'd like to hear from (PhD supervisors, collaborators in comp bio).

---

## 7. Signature interactive components

These are the pieces that make the site _yours_. Each uses **real data/results**
and each has a static reduced-motion fallback.

1. **Hero deconvolution point cloud** _(R3F)_ — bulk blob → labelled cell-type
   clusters. The site's thesis in one animation. (Home)

2. **Deconvolution explorer** _(visx)_ — a single "bulk sample" bar splits into a
   stacked bar of cell-type proportions; a toggle switches the reference/method
   (**CIBERSORTx / MuSiC / Bisque**) and the proportions visibly shift —
   dramatizing your finding that _reference choice and method assumptions drive
   the estimates_. (Research / Crohn's case study)

3. **Attention-on-EEG** _(Canvas/SVG)_ — animated multi-channel EEG traces with a
   sweeping **attention heatmap** overlay; a selector cycles the 7 seizure types;
   a dial holds at **98.4%**. (MHA-CNN case study)

4. **Forecast horizon slider** _(visx)_ — influenza curve with a draggable
   forecast horizon; the **RMSE readout** updates (anchored at 873.27 @ 1 week),
   TimeGPT vs. baseline. (TimeGPT case study)

5. **Signal decomposition** _(visx)_ — an SFTS series peels apart into
   IMFs/harmonic components (Complex EMD), with the harmonic fit at **R² = 0.848**.
   (SFTS case study)

6. **Journey map** _(react-simple-maps / custom SVG)_ — animated migration path
   across four cities. (Journey)

Build order priority: **1 → 2 → 3** are the highest-impact; 4–6 can follow.

---

## 8. Art & imagery direction

You asked for pictures, illustration, and art to make the journey legible. Plan:

**Direction:** "Scientific bioluminescence." Dark ground, teal/coral line-and-glow
illustration, generative particle/point textures, waveform motifs. Everything
should look like it _came out of an instrument_ — plots, embeddings, traces —
rather than stock 3D blobs.

**Asset checklist (generate with OpenArt / image tools, per Level 4 of the video):**

- Abstract **UMAP cluster** field (hero fallback + OG image).
- **EEG / waveform** ribbon dividers between sections.
- Per-domain **spot illustrations** (genomics, neuro-signal, epidemiology,
  systems) as section headers — consistent line weight and the two-accent palette.
- A **stylized portrait treatment** of your headshot (`assets/img/prof_pic.jpg`
  already exists) — duotone teal/ink, used on Journey/Contact. Keep one _real_
  photo too; people trust a real face.
- **Social/OG card** (1200×630) with the resolved-clusters motif + name/role.
- Favicon + wordmark: a tiny "bulk→resolved" glyph (three dots emerging from one).

**Rules:** every generated asset ships as optimized AVIF/WebP via `next/image`;
illustration never competes with a data figure on the same screen; real numbers
and real plots always outrank decorative art.

---

## 9. Content model

Typed collections (MDX + frontmatter), migrated from the existing repo:

```ts
Project   { slug, title, domain, year, role, summary, methods[], results[{label,value}],
            links{doi?,code?,paper?}, figure: 'deconv'|'eeg'|'forecast'|'emd'|'none', importance }
Paper     { title, authors[], venue, year, type:'journal'|'proceedings',
            doi?, scholar?, contribution }
Milestone { date, kind:'education'|'research'|'award'|'news', place{city,country,lat,lng}, title, body }
Post      { slug, title, date, tags[], body(mdx) }
Profile   { name, roles[], email, socials{github,linkedin,scholar,orcid,researchgate}, metrics[] }
```

Source data already present: `_projects/*`, `_bibliography/papers.bib`,
`_news/*`, `_data/socials.yml`, `assets/img/*`, and the attached CV PDF.

---

## 10. Accessibility

- WCAG 2.2 AA contrast in **both** themes (validate the categorical palette).
- Full keyboard nav; visible focus rings; Radix/shadcn semantics.
- Every interactive figure has a text/table equivalent and an accessible
  description — the _point_ of your work is interpretability, so the site must be
  interpretable to a screen reader too.
- `prefers-reduced-motion`: static final frames everywhere; no essential info is
  motion-only.
- Semantic headings, skip links, alt text on all imagery.

## 11. Performance & SEO

- **Budgets:** LCP < 2.0s, CLS < 0.05, hero JS (incl. R3F) lazy/dynamic-imported
  and code-split so it never blocks first paint; static fallback renders instantly.
- SSG for all content routes; stream the WebGL in after hydration.
- `next/image` (AVIF/WebP, responsive), font subsetting, self-hosted fonts.
- Per-page metadata, JSON-LD **`Person`** + **`ScholarlyArticle`** schema (helps
  Scholar/Google), sitemap, OG/Twitter cards, canonical URLs.
- Lighthouse ≥ 95 across the board is the acceptance bar (the repo already tracks
  Lighthouse — keep that discipline).

## 12. Build roadmap

- **Phase 0 — Foundation:** Next.js + TS + Tailwind + shadcn scaffold, design
  tokens (Section 4), content collections, migrate project/paper/news data, deploy
  skeleton to Vercel.
- **Phase 1 — Structure & story:** all routes, nav, page transitions, narrative
  scroll copy, static versions of every figure. Site is _complete and shippable_
  here even with zero WebGL.
- **Phase 2 — Signature interactions:** hero deconvolution (1), deconvolution
  explorer (2), attention-on-EEG (3).
- **Phase 3 — Depth:** forecast slider (4), EMD (5), journey map (6), blog polish.
- **Phase 4 — Art & polish:** OpenArt asset pass, OG cards, motion tuning,
  a11y + Lighthouse audit, reduced-motion QA.

Ship at the end of Phase 1; everything after is enhancement, never a blocker.

---

## 13. Repo decision

Recommendation: **new repository** (e.g. `taymuur/portfolio` or
`taymuur/taymuur.github.io`) for the Next.js app, so the bespoke build starts
clean and the git history isn't tangled with the `al-folio` template. Keep this
repo only as a **data archive** until migration is verified, then archive it.
Deploy the new app on Vercel with a custom domain; point the old GitHub Pages URL
at it.

---

### One-line brief for the build agent

> Build a dark, instrument-grade Next.js portfolio whose every interaction
> performs the same move Taimur's research does — **resolving a mixed signal into
> interpretable parts** — anchored by a WebGL hero that deconvolves a bulk blob
> into labelled cell-type clusters, and backed by live figures of his real
> results (98.4% seizure classification, CIBERSORTx/MuSiC/Bisque deconvolution,
> TimeGPT RMSE 873.27, SFTS EMD R²=0.848).
