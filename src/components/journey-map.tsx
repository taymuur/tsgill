"use client";

import { places } from "@/content/journey";

const W = 900;
const H = 440;
const LNG_MIN = -15;
const LNG_MAX = 80;
const LAT_MIN = 25;
const LAT_MAX = 60;

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return { x, y };
}

export function JourneyMap() {
  const nodes = [...places].sort((a, b) => a.order - b.order).map((p) => ({ ...p, ...project(p.lat, p.lng) }));

  const arcs = nodes.slice(1).map((n, i) => {
    const a = nodes[i];
    const mx = (a.x + n.x) / 2;
    const my = Math.min(a.y, n.y) - 60;
    return `M${a.x} ${a.y} Q ${mx} ${my} ${n.x} ${n.y}`;
  });

  const gridX = Array.from({ length: 10 }, (_, i) => (i / 9) * W);
  const gridY = Array.from({ length: 6 }, (_, i) => (i / 5) * H);

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Migration path: Islamabad, Stuttgart, Liverpool, Norwich">
        {gridX.map((x, i) => (
          <line key={`x${i}`} x1={x} y1={0} x2={x} y2={H} stroke="var(--border)" strokeWidth={0.5} opacity={0.4} />
        ))}
        {gridY.map((y, i) => (
          <line key={`y${i}`} x1={0} y1={y} x2={W} y2={y} stroke="var(--border)" strokeWidth={0.5} opacity={0.4} />
        ))}

        {arcs.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.6}
            strokeDasharray="6 6"
            className="journey-arc"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {nodes.map((n) => (
          <g key={n.city}>
            <circle cx={n.x} cy={n.y} r={10} fill="var(--accent)" opacity={0.15} />
            <circle cx={n.x} cy={n.y} r={4} fill="var(--accent)" />
            <text
              x={n.x + 12}
              y={n.y + 4}
              fill="var(--text)"
              fontSize={13}
              fontFamily="var(--font-jetbrains), monospace"
            >
              {n.city}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mono-label border-t border-border px-4 py-3">
        Islamabad → Stuttgart → Liverpool → Norwich
      </figcaption>
    </figure>
  );
}
