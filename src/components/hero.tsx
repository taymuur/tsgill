import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "./ui";

const clusterColors = ["#35e0c2", "#7c9cff", "#ff8a5b", "#b98cff", "#4ed8ff", "#ffd166", "#f871a0"];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/** Deterministic "resolved clusters" field — the static form of the hero deconvolution. */
function HeroField() {
  const rand = rng(42);
  const clusters = clusterColors.map((c, i) => ({
    c,
    cx: 120 + (i % 4) * 250 + rand() * 80,
    cy: 120 + Math.floor(i / 4) * 260 + rand() * 60,
  }));
  const dots = Array.from({ length: 520 }, (_, i) => {
    const cl = clusters[i % clusters.length];
    const a = rand() * Math.PI * 2;
    const r = rand() * 90 * (0.4 + rand());
    return {
      x: cl.cx + Math.cos(a) * r,
      y: cl.cy + Math.sin(a) * r,
      c: cl.c,
      d: (rand() * 6).toFixed(2),
    };
  });
  return (
    <svg
      viewBox="0 0 1200 640"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2} fill={d.c} className="hero-dot" style={{ animationDelay: `${d.d}s` }} />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_80%_at_70%_30%,black,transparent)]">
        <HeroField />
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
          <span className="mono-label">Scroll — watch the signal resolve</span>
        </div>
      </Container>
    </section>
  );
}
