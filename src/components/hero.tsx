import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { site } from "@/config/site";
import { Container } from "./ui";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  const { hero } = site;
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(85%_85%_at_68%_35%,black,transparent)]">
        <HeroVisual />
      </div>
      <Container className="relative flex min-h-[82vh] flex-col justify-center py-24">
        {hero.eyebrow && <p className="mono-label mb-6">{hero.eyebrow}</p>}
        <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
          {hero.heading}
        </h1>
        {hero.subheading && <p className="mt-6 max-w-2xl text-xl text-text-muted sm:text-2xl">{hero.subheading}</p>}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {hero.ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={
                cta.variant === "outline"
                  ? "rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  : "rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
              }
            >
              {cta.label}
            </Link>
          ))}
        </div>
        {hero.scrollHint && (
          <div className="mt-16 flex items-center gap-2 text-text-muted">
            <ArrowDown size={16} className="animate-bounce" aria-hidden />
            <span className="mono-label">{hero.scrollHint}</span>
          </div>
        )}
      </Container>
    </section>
  );
}
