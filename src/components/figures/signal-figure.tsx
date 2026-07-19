"use client";

import { useMemo, useState } from "react";

export type SignalPreset = { key: string; label: string; freq: number; chaos: number; focus: number };
export type SignalProps = {
  caption?: string;
  note?: string;
  rows?: number;
  highlightLabel?: string;
  readout?: { label: string; value: string };
  presets: SignalPreset[];
};

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

/** Generic multi-row waveform with a moving highlight window + preset switch. */
export function SignalFigure({ caption, note, rows = 5, highlightLabel, readout, presets }: SignalProps) {
  const [idx, setIdx] = useState(0);
  const preset = presets[idx];

  const paths = useMemo(() => {
    const rand = seeded(idx * 97 + 13);
    return Array.from({ length: rows }, (_, r) => {
      const yBase = 26 + r * ((H - 40) / Math.max(1, rows - 1));
      let d = `M0 ${yBase.toFixed(1)}`;
      for (let x = 0; x <= W; x += 5) {
        const burst = Math.exp(-Math.pow((x - preset.focus * W) / (0.12 * W), 2));
        const amp = 7 + preset.chaos * 6 * (0.5 + rand()) + burst * 14;
        const y = yBase + Math.sin(x / (60 / preset.freq) + r) * amp + (rand() - 0.5) * preset.chaos * 6;
        d += ` L${x} ${y.toFixed(1)}`;
      }
      return d;
    });
  }, [idx, preset, rows]);

  const hlX = preset.focus * W - 45;

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        {caption && <p className="mono-label">{caption}</p>}
        {readout && (
          <p className="mono-label">
            {readout.label} <span className="text-accent">{readout.value}</span>
          </p>
        )}
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Signal for ${preset.label}`}>
          <rect x={hlX} y={6} width={90} height={H - 12} fill="var(--accent-warm)" opacity={0.12} />
          <rect x={hlX} y={6} width={90} height={H - 12} fill="none" stroke="var(--accent-warm)" strokeOpacity={0.5} strokeDasharray="3 3" />
          {highlightLabel && (
            <text x={hlX + 45} y={20} fill="var(--accent-warm)" fontSize={9} textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
              {highlightLabel}
            </text>
          )}
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--accent)" strokeWidth={1.3} opacity={0.85} />
          ))}
        </svg>
      </div>

      {presets.length > 1 && (
        <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3" role="group" aria-label="Preset">
          {presets.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setIdx(i)}
              aria-pressed={idx === i}
              title={p.label}
              className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                idx === i ? "bg-accent text-[var(--bg)]" : "border border-border text-text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {p.key}
            </button>
          ))}
        </div>
      )}
      {(note || preset.label) && (
        <figcaption className="mono-label border-t border-border px-4 py-2.5">
          {preset.label}
          {note ? ` · ${note}` : ""}
        </figcaption>
      )}
    </figure>
  );
}
