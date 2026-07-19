function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/** Static clustered dot field — SSR / no-WebGL / reduced-motion fallback. Topic-agnostic. */
export function HeroFieldSVG({ palette, groups }: { palette: readonly string[]; groups: number }) {
  const rand = rng(42);
  const clusters = Array.from({ length: groups }, (_, i) => ({
    c: palette[i % palette.length],
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
