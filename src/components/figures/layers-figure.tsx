"use client";

import { useMemo, useState } from "react";

export type Layer = { label: string; freq: number; amp: number; color: string };
export type LayersProps = {
  caption?: string;
  note?: string;
  readout?: { label: string; value: string };
  layers: Layer[];
};

const W = 720;
const ROW_H = 62;
const PAD = 16;

function wave(freq: number, amp: number, yMid: number) {
  let d = `M0 ${yMid}`;
  for (let x = 0; x <= W; x += 5) {
    const y = yMid + Math.sin(x / freq) * amp;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}

/** Generic stack of toggleable component waves that sum into a reconstruction. */
export function LayersFigure({ caption, note, readout, layers }: LayersProps) {
  const [on, setOn] = useState<boolean[]>(layers.map(() => true));

  const reconstruction = useMemo(() => {
    const yMid = ROW_H / 2 + PAD;
    let d = `M0 ${yMid}`;
    for (let x = 0; x <= W; x += 5) {
      let y = yMid;
      layers.forEach((l, i) => {
        if (on[i]) y += Math.sin(x / l.freq) * l.amp * 0.5;
      });
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return d;
  }, [on, layers]);

  const toggle = (i: number) => setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));

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
        <div className="mb-2">
          <p className="mono-label mb-1">reconstruction (sum of active modes)</p>
          <svg viewBox={`0 0 ${W} ${ROW_H + PAD}`} className="w-full" role="img" aria-label="Reconstructed signal">
            <path d={reconstruction} fill="none" stroke="var(--text)" strokeWidth={1.8} />
          </svg>
        </div>

        <div className="space-y-1">
          {layers.map((l, i) => (
            <button
              key={l.label}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={on[i]}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-opacity ${
                on[i] ? "opacity-100" : "opacity-35"
              } hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]`}
            >
              <span className="mono-label w-40 shrink-0" style={{ color: on[i] ? l.color : undefined }}>
                {l.label}
              </span>
              <svg viewBox={`0 0 ${W} ${ROW_H}`} className="h-8 w-full" aria-hidden>
                <path d={wave(l.freq, l.amp, ROW_H / 2)} fill="none" stroke={l.color} strokeWidth={1.4} />
              </svg>
            </button>
          ))}
        </div>
      </div>
      {note && <figcaption className="mono-label border-t border-border px-4 py-2.5">{note}</figcaption>}
    </figure>
  );
}
