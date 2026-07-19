import Link from "next/link";
import { site } from "@/config/site";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-[var(--maxw)] gap-8 px-6 py-14 sm:grid-cols-2">
        <div>
          <p className="font-display text-xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-text-muted">{site.footer.tagline}</p>
          <p className="mt-1 text-sm text-text-muted">{site.location}</p>
        </div>
        <div className="sm:justify-self-end">
          <p className="mono-label mb-3">Elsewhere</p>
          <SocialLinks />
          <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
            {site.nav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-accent">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-[var(--maxw)] px-6 py-5 text-xs text-text-muted">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
