import { site } from "@/config/site";

/**
 * The site's canonical origin, resolved for whatever environment it runs in:
 *  1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain.
 *  2. Vercel's production URL — set automatically on Vercel.
 *  3. The fallback in site.seo.url.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return site.seo.url.replace(/\/$/, "");
}
