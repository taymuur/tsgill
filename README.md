# Taimur Shahzad Gill — Portfolio

Interactive research portfolio for a computational biologist. Built around a single
idea: **resolving mixed signals into interpretable structure** — the through-line of
Taimur's work across neuroscience, genomics, epidemiology and forecasting.

See [`DESIGN.md`](./DESIGN.md) for the full design blueprint.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** design tokens (dark-first "instrument" palette)
- **next-themes** for light/dark
- Typed content collections in `src/content/`
- Fonts: Fraunces (display) · Inter (body) · JetBrains Mono (data)

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Structure

```
src/
  app/         routes (home, research, projects, publications, journey, cv, contact)
  components/  nav, footer, hero, figures, cards, journey map, theme
  content/     typed data: profile, projects, publications, journey, thesis
public/        CV PDF, headshot
```

## Roadmap

Phase 0–1 (this build): full site, design system, all routes, static figures.
Next: WebGL hero deconvolution (React Three Fiber), live interactive figures
(visx), scroll storytelling (GSAP). See `DESIGN.md` §12.
