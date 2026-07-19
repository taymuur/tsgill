"use client";

import { useMemo, useState } from "react";

/**
 * EMD explorer: a composite signal decomposed into intrinsic mode functions.
 * Toggle IMFs on/off and the reconstruction (top) updates — showing how the
 * multi-scale cycles sum to the observed signal. Harmonic fit R² = 0.848 is the
 * reported figure; the traces are illustrative.
 */

const W = 720;
const ROW_H = 62;
const PAD = 16;

const IMFS = [
  { key: "imf1", label: "IMF 1 · high-freq noise", freq: 5, amp: 8, color: "var(--c7)" },
  { key: "imf2", label: "IMF 2 · sub-seasonal", freq: 13, amp: 12, color: "var(--c4)" },
  { key: "imf3", label: "IMF 3 · seasonal", freq: 34, amp: 16, color: "var(--c1)" },
  { key: "imf4", label: "IMF 4 · annual trend", freq: 80, amp: 11, color: "var(--c6)" },
];

function wave(freq: number, amp: number, yMid: number) {
  let d = `M0 ${yMid}`;
  for (let x = 0; x <= W; x += 5) {
    const y = yMid + Math.sin(x / freq) * amp;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}

export function EMDExplorer() {
  const [on, setOn] = useState<boolean[]>(IMFS.map(() => true));

  const reconstruction = useMemo(() => {
    const yMid = ROW_H / 2 + PAD;
    let d = `M0 ${yMid}`;
    for (let x = 0; x <= W; x += 5) {
      let y = yMid;
      IMFS.forEach((imf, i) => {
        if (on[i]) y += Math.sin(x / imf.freq) * imf.amp * 0.5;
      });
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return d;
  }, [on]);

  const toggle = (i: number) => setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="mono-label">SFTS · complex EMD</p>
        <p className="mono-label">
          harmonic fit <span className="text-accent">R² = 0.848</span>
        </p>
      </div>

      <div className="p-4">
        {/* Reconstruction */}
        <div className="mb-2">
          <p className="mono-label mb-1">reconstruction (sum of active modes)</p>
          <svg viewBox={`0 0 ${W} ${ROW_H + PAD}`} className="w-full" role="img" aria-label="Reconstructed signal">
            <path d={reconstruction} fill="none" stroke="var(--text)" strokeWidth={1.8} />
          </svg>
        </div>

        {/* Individual IMFs */}
        <div className="space-y-1">
          {IMFS.map((imf, i) => (
            <button
              key={imf.key}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={on[i]}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-opacity ${
                on[i] ? "opacity-100" : "opacity-35"
              } hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]`}
            >
              <span className="mono-label w-40 shrink-0" style={{ color: on[i] ? imf.color : undefined }}>
                {imf.label}
              </span>
              <svg viewBox={`0 0 ${W} ${ROW_H}`} className="h-8 w-full" aria-hidden>
                <path d={wave(imf.freq, imf.amp, ROW_H / 2)} fill="none" stroke={imf.color} strokeWidth={1.4} />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <figcaption className="mono-label border-t border-border px-4 py-2.5">
        Toggle modes to see how multi-scale cycles sum to the observed signal (illustrative)
      </figcaption>
    </figure>
  );
}
