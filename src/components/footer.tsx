import Link from "next/link";
import { profile } from "@/content/profile";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-[var(--maxw)] gap-8 px-6 py-14 sm:grid-cols-2">
        <div>
          <p className="font-display text-xl">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-text-muted">{profile.tagline}</p>
          <p className="mt-1 text-sm text-text-muted">{profile.location}</p>
        </div>
        <div className="sm:justify-self-end">
          <p className="mono-label mb-3">Elsewhere</p>
          <SocialLinks />
          <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
            <Link href="/research" className="hover:text-accent">Research</Link>
            <Link href="/projects" className="hover:text-accent">Projects</Link>
            <Link href="/publications" className="hover:text-accent">Publications</Link>
            <Link href="/journey" className="hover:text-accent">Journey</Link>
            <Link href="/cv" className="hover:text-accent">CV</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-[var(--maxw)] px-6 py-5 text-xs text-text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
