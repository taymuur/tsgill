import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "./ui";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(85%_85%_at_68%_35%,black,transparent)]">
        <HeroVisual />
      </div>
      <Container className="relative flex min-h-[82vh] flex-col justify-center py-24">
        <p className="mono-label mb-6">{profile.roles[0]} · Norwich, UK</p>
        <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-text-muted sm:text-2xl">{profile.thesis}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/research"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            See the research
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Browse projects
          </Link>
        </div>
        <div className="mt-16 flex items-center gap-2 text-text-muted">
          <ArrowDown size={16} className="animate-bounce" aria-hidden />
          <span className="mono-label">Watch the signal resolve into cell types</span>
        </div>
      </Container>
    </section>
  );
}
