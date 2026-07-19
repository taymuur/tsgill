"use client";

import { useMemo, useState } from "react";

export type TimeseriesProps = {
  title?: string;
  caption?: string;
  note?: string;
  controlLabel?: string;
  unit?: string;
  readoutLabel?: string;
  baseValue?: number;
};

const W = 720;
const H = 260;
const HISTORY = 44;
const STEP = W / (HISTORY + 12);

function seeded(seed: number) {
  let s = seed + 0x6d2b79f5;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generic history curve + adjustable forecast horizon. Topic-agnostic. */
export function TimeseriesFigure({
  title,
  caption,
  note,
  controlLabel = "horizon",
  unit = "w",
  readoutLabel = "error",
  baseValue = 100,
}: TimeseriesProps) {
  const [horizon, setHorizon] = useState(4);

  const { histPath, foreData } = useMemo(() => {
    const rand = seeded(7);
    const vals: number[] = [];
    for (let i = 0; i < HISTORY; i++) {
      const seasonal = Math.sin(i / 7) * 0.7 + Math.sin(i / 3.1) * 0.15;
      vals.push(seasonal + (rand() - 0.5) * 0.22);
    }
    const min = Math.min(...vals) - 0.6;
    const max = Math.max(...vals) + 0.6;
    const yOf = (v: number) => H - 20 - ((v - min) / (max - min)) * (H - 40);
    const histPath = vals.map((v, i) => `${i ? "L" : "M"}${(i * STEP).toFixed(1)} ${yOf(v).toFixed(1)}`).join(" ");
    const last = vals[HISTORY - 1];
    const foreData = Array.from({ length: 12 }, (_, h) => {
      const i = HISTORY - 1 + h;
      const seasonal = Math.sin(i / 7) * 0.7 + Math.sin(i / 3.1) * 0.15;
      const v = h === 0 ? last : seasonal;
      return { x: i * STEP, y: yOf(v), band: 6 + h * 3.2 };
    });
    return { histPath, foreData };
  }, []);

  const shown = foreData.slice(0, horizon + 1);
  const forePath = shown.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const bandPath =
    shown.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${(p.y - p.band).toFixed(1)}`).join(" ") +
    " " +
    [...shown].reverse().map((p) => `L${p.x.toFixed(1)} ${(p.y + p.band).toFixed(1)}`).join(" ") +
    " Z";
  const splitX = (HISTORY - 1) * STEP;
  const readout = (baseValue * Math.sqrt(horizon)).toFixed(2);

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        {(title || caption) && <p className="mono-label">{title ?? caption}</p>}
        <p className="mono-label">
          {readoutLabel} <span className="text-accent">{readout}</span> @ {horizon}
          {unit}
        </p>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Forecast at a ${horizon}-${unit} horizon`}>
          <line x1={splitX} y1={12} x2={splitX} y2={H - 12} stroke="var(--text-muted)" strokeOpacity={0.35} strokeDasharray="2 3" />
          <path d={bandPath} fill="var(--c5)" opacity={0.14} />
          <path d={histPath} fill="none" stroke="var(--c2)" strokeWidth={1.8} />
          <path d={forePath} fill="none" stroke="var(--c5)" strokeWidth={1.8} strokeDasharray="5 4" />
        </svg>
      </div>

      <div className="flex items-center gap-3 border-t border-border px-4 py-3">
        <span className="mono-label shrink-0">{controlLabel}</span>
        <input
          type="range"
          min={1}
          max={11}
          value={horizon}
          onChange={(e) => setHorizon(Number(e.target.value))}
          aria-label={`${controlLabel} in ${unit}`}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--accent)]"
        />
        <span className="mono-label w-10 shrink-0 text-right text-accent">
          {horizon}
          {unit}
        </span>
      </div>
      {note && <figcaption className="mono-label border-t border-border px-4 py-2.5">{note}</figcaption>}
    </figure>
  );
}
