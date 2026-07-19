import { site } from "@/config/site";

export function MetricBand() {
  if (site.metrics.length === 0) return null;
  return (
    <div className="border-y border-border">
      <dl className="mx-auto grid max-w-[var(--maxw)] grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
        {site.metrics.map((m) => (
          <div key={m.label} className="px-6 py-7">
            <dt className="font-display text-3xl font-semibold text-accent sm:text-4xl">{m.value}</dt>
            <dd className="mt-1 text-xs text-text-muted">{m.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
