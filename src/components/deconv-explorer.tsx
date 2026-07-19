"use client";

import { useState } from "react";

/**
 * Interactive illustration of the dissertation's core finding: the estimated
 * cell-type composition of the SAME bulk sample shifts with the deconvolution
 * method / reference. Proportions here are schematic, for illustration — not
 * measured results.
 */

const CELL_TYPES = [
  { key: "epithelial", label: "Epithelial", color: "var(--c1)" },
  { key: "tcell", label: "T cells", color: "var(--c2)" },
  { key: "bcell", label: "B / Plasma", color: "var(--c4)" },
  { key: "myeloid", label: "Myeloid", color: "var(--c3)" },
  { key: "fibroblast", label: "Fibroblasts", color: "var(--c6)" },
  { key: "endothelial", label: "Endothelial", color: "var(--c5)" },
  { key: "other", label: "Other", color: "var(--c7)" },
] as const;

type Method = "CIBERSORTx" | "MuSiC" | "Bisque";

const ESTIMATES: Record<Method, number[]> = {
  // epithelial, tcell, bcell, myeloid, fibroblast, endothelial, other
  CIBERSORTx: [34, 22, 14, 12, 9, 5, 4],
  MuSiC: [41, 17, 11, 10, 12, 6, 3],
  Bisque: [28, 26, 16, 14, 8, 5, 3],
};

const METHODS: Method[] = ["CIBERSORTx", "MuSiC", "Bisque"];

export function DeconvExplorer() {
  const [method, setMethod] = useState<Method>("CIBERSORTx");
  const values = ESTIMATES[method];

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="mono-label">Estimated composition · one bulk sample</p>
        <div className="flex gap-1" role="group" aria-label="Deconvolution method">
          {METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              aria-pressed={method === m}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                method === m
                  ? "bg-accent text-[var(--bg)]"
                  : "border border-border text-text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* Stacked proportion bar */}
        <div className="flex h-12 w-full overflow-hidden rounded-lg" role="img" aria-label={`Cell-type proportions estimated by ${method}`}>
          {CELL_TYPES.map((c, i) => (
            <div
              key={c.key}
              className="h-full transition-[width] duration-700 ease-out"
              style={{ width: `${values[i]}%`, background: c.color }}
              title={`${c.label}: ${values[i]}%`}
            />
          ))}
        </div>

        {/* Legend + values */}
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {CELL_TYPES.map((c, i) => (
            <div key={c.key} className="flex items-center justify-between gap-2 text-sm">
              <dt className="flex items-center gap-2 text-text-muted">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                {c.label}
              </dt>
              <dd className="font-mono tabular-nums text-text transition-colors">{values[i]}%</dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className="mono-label border-t border-border px-4 py-3">
        Schematic · reference &amp; method choice drive the estimate (CATD benchmarking)
      </figcaption>
    </figure>
  );
}
