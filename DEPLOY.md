# Deploying (free, on Vercel)

This is a standard Next.js app, so Vercel deploys it with **zero config** on the
free **Hobby** plan. You get automatic builds on every push, a preview URL on
every pull request, and production on the `main` branch — all free.

## One-time setup (~2 minutes)

1. Go to **https://vercel.com/new** and sign in **with GitHub**.
2. **Import** the `taymuur/tsgill` repository.
3. Vercel auto-detects **Next.js** — leave every setting at its default:
   - Framework preset: Next.js
   - Build command: `next build` (default)
   - Install command: `pnpm install` (auto, from `pnpm-lock.yaml`)
   - Output: handled automatically — **do not** set "Output Directory".
   - Environment variables: **none required**.
4. Click **Deploy**. In ~1 minute you'll get a live URL like
   `https://tsgill.vercel.app`.

That's it. From now on:
- Every push to `main` → production deploy.
- Every pull request → its own preview URL (great for reviewing changes).

## After the first deploy

**Set the canonical URL** so SEO tags, the sitemap, and social cards use the
right origin. In Vercel → Project → **Settings → Environment Variables**, add:

```
NEXT_PUBLIC_SITE_URL = https://<your-domain-or-vercel-url>
```

(If you skip this, it falls back to the Vercel production URL automatically.)

## Custom domain (optional, free)

Vercel → Project → **Settings → Domains** → add your domain (e.g.
`taimur.dev`) and follow the DNS instructions. TLS is automatic and free.
Then update `NEXT_PUBLIC_SITE_URL` to that domain.

## What's already wired for you

- **Security headers** (`next.config.ts`).
- **`sitemap.xml`** and **`robots.txt`** (generated from your content).
- A **social/OG image** at `/opengraph-image` (generated at build).
- Per-page SEO metadata and a `Person` JSON-LD block.

## Staying free

Everything here fits the Vercel Hobby (free) tier: static + SSG pages, the
build-time OG image, and the light serverless surface. No paid add-ons are
enabled. If you later want traffic stats, Vercel **Web Analytics** has a free
tier you can toggle on in the dashboard — no code change needed.
