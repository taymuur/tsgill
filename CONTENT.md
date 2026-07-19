# Editing the site

Everything you'd want to change lives in a handful of plain files. You don't need
to touch any component code. After editing, run `pnpm dev` to preview.

## Where things live

| To change… | Edit |
|---|---|
| Your name, email, location, nav links, metrics, socials, SEO | `src/config/site.ts` |
| The hero background (colors, style, density) and hero text | `src/config/site.ts` → `hero` |
| Headings & paragraphs on every page | `src/content/copy.ts` |
| Projects / case studies (incl. their figures) | `src/content/projects.ts` |
| Publications | `src/content/publications.ts` |
| Journey timeline & map pins | `src/content/journey.ts` |
| CV education / experience / skills | `src/content/cv.ts` |
| The "through-line" table on Research + home | `src/content/thesis.ts` |
| Theme **colors** and **fonts** | `src/app/globals.css` (`:root`) and `src/app/layout.tsx` |
| Your CV PDF and photo | drop files in `public/`, point to them in `site.ts` / `copy.ts` |

## The hero background

In `src/config/site.ts`, `hero.background`:

```ts
background: {
  mode: "clusters",   // "clusters" = blob that resolves into groups; "field" = calm drift
  groups: 7,          // number of clusters
  count: 7000,        // number of points (lower = faster on weak devices)
  palette: ["#35e0c2", "#7c9cff", ...],  // any list of colors
}
```

It's purely decorative and not tied to any topic — change the palette to rebrand it,
switch `mode` to `"field"` for a calmer look, or lower `count` for performance.

## Project figures

Each project in `src/content/projects.ts` has a `figure` field. Pick a `type` and
fill in the data — no component code required. Use `{ type: "none" }` for no figure.

- **`proportions`** — a stacked bar with switchable presets (e.g. methods, scenarios).
  Fields: `categories` (label + color), `options` (each a `name` + `values[]` that
  align to the categories and sum to ~100).
- **`signal`** — multi-row waveforms with a moving highlight window and preset buttons.
  Fields: `presets` (each `key`, `label`, `freq`, `chaos`, `focus` 0–1), optional
  `highlightLabel`, `readout`, `rows`.
- **`timeseries`** — a history curve with a draggable forecast horizon and a scaling
  readout. Fields: `title`, `controlLabel`, `unit`, `readoutLabel`, `baseValue`.
- **`layers`** — a stack of toggleable component waves that sum into a reconstruction.
  Fields: `layers` (each `label`, `freq`, `amp`, `color`), optional `readout`.

Colors accept a design-token like `var(--c1)` … `var(--c8)` (defined in `globals.css`)
or any hex string. Every figure also takes an optional `caption` and `note`.

## Colors & fonts

- **Colors:** `src/app/globals.css`, the `:root` block at the top. Edit `--accent`,
  `--accent-warm`, the `--c1`…`--c8` categorical set, and the ink/mist grounds.
  There's a matching `:root[data-theme="light"]` block for light mode.
- **Fonts:** `src/app/layout.tsx` imports three Google fonts (display / sans / mono).
  Swap the imports and the CSS variable names flow through automatically.

## Adding or removing a page

Pages are folders under `src/app/`. Copy an existing one (e.g. `src/app/research/`),
change its copy in `src/content/copy.ts`, and add a nav entry in `site.ts` → `nav`.
