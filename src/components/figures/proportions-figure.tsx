"use client";

import { useState } from "react";

export type ProportionsProps = {
  caption?: string;
  note?: string;
  categories: { label: string; color: string }[];
  options: { name: string; values: number[] }[];
};

/** Generic stacked-proportion bar with switchable presets. Topic-agnostic. */
export function ProportionsFigure({ caption, note, categories, options }: ProportionsProps) {
  const [active, setActive] = useState(0);
  const values = options[active]?.values ?? [];

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        {caption && <p className="mono-label">{caption}</p>}
        {options.length > 1 && (
          <div className="flex flex-wrap gap-1" role="group" aria-label="Preset">
            {options.map((o, i) => (
              <button
                key={o.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  active === i
                    ? "bg-accent text-[var(--bg)]"
                    : "border border-border text-text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {o.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <div
          className="flex h-12 w-full overflow-hidden rounded-lg"
          role="img"
          aria-label={`Proportions for ${options[active]?.name ?? ""}`}
        >
          {categories.map((c, i) => (
            <div
              key={c.label}
              className="h-full transition-[width] duration-700 ease-out"
              style={{ width: `${values[i] ?? 0}%`, background: c.color }}
              title={`${c.label}: ${values[i] ?? 0}%`}
            />
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
          {categories.map((c, i) => (
            <div key={c.label} className="flex items-center justify-between gap-2 text-sm">
              <dt className="flex items-center gap-2 text-text-muted">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                {c.label}
              </dt>
              <dd className="font-mono tabular-nums text-text">{values[i] ?? 0}%</dd>
            </div>
          ))}
        </dl>
      </div>

      {note && <figcaption className="mono-label border-t border-border px-4 py-3">{note}</figcaption>}
    </figure>
  );
}
