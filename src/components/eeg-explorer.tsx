"use client";

import { useMemo, useState } from "react";

/**
 * Interactive EEG classifier illustration: pick a seizure type and watch the
 * multi-channel traces and the attention window change. The 98.4% figure is the
 * real reported test accuracy (Epilepsy & Behavior 2024); the traces are
 * synthetic, for illustration.
 */

const TYPES = [
  { key: "FNSZ", label: "Focal non-specific", freq: 9, chaos: 0.5, att: 0.25 },
  { key: "GNSZ", label: "Generalized non-specific", freq: 6, chaos: 0.9, att: 0.5 },
  { key: "SPSZ", label: "Simple partial", freq: 12, chaos: 0.3, att: 0.15 },
  { key: "CPSZ", label: "Complex partial", freq: 8, chaos: 0.6, att: 0.4 },
  { key: "ABSZ", label: "Absence", freq: 3, chaos: 0.2, att: 0.55 },
  { key: "TNSZ", label: "Tonic", freq: 14, chaos: 0.7, att: 0.35 },
  { key: "TCSZ", label: "Tonic-clonic", freq: 5, chaos: 1.0, att: 0.6 },
] as const;

const ROWS = 5;
const W = 720;
const H = 240;

function seeded(seed: number) {
  let s = seed + 0x6d2b79f5;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function EEGExplorer() {
  const [idx, setIdx] = useState(0);
  const type = TYPES[idx];

  const paths = useMemo(() => {
    const rand = seeded(idx * 97 + 13);
    return Array.from({ length: ROWS }, (_, r) => {
      const yBase = 26 + r * ((H - 40) / (ROWS - 1));
      let d = `M0 ${yBase.toFixed(1)}`;
      for (let x = 0; x <= W; x += 5) {
        const burst = Math.exp(-Math.pow((x - type.att * W) / (0.12 * W), 2)); // spike near attention
        const amp = 7 + type.chaos * 6 * (0.5 + rand()) + burst * 14;
        const y = yBase + Math.sin(x / (60 / type.freq) + r) * amp + (rand() - 0.5) * type.chaos * 6;
        d += ` L${x} ${y.toFixed(1)}`;
      }
      return d;
    });
  }, [idx, type]);

  const attX = type.att * W - 45;

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="mono-label">EEG · multi-head attention</p>
        <p className="mono-label">
          test accuracy <span className="text-accent">98.4%</span>
        </p>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`EEG traces for ${type.label} seizure`}>
          <rect x={attX} y={6} width={90} height={H - 12} fill="var(--accent-warm)" opacity={0.12} />
          <rect
            x={attX}
            y={6}
            width={90}
            height={H - 12}
            fill="none"
            stroke="var(--accent-warm)"
            strokeOpacity={0.5}
            strokeDasharray="3 3"
          />
          <text x={attX + 45} y={20} fill="var(--accent-warm)" fontSize={9} textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
            attention
          </text>
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--accent)" strokeWidth={1.3} opacity={0.85} />
          ))}
        </svg>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3" role="group" aria-label="Seizure type">
        {TYPES.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setIdx(i)}
            aria-pressed={idx === i}
            title={t.label}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
              idx === i ? "bg-accent text-[var(--bg)]" : "border border-border text-text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {t.key}
          </button>
        ))}
      </div>
      <figcaption className="mono-label border-t border-border px-4 py-2.5">
        {type.label} · attention focuses on the discriminative window (illustrative traces)
      </figcaption>
    </figure>
  );
}
