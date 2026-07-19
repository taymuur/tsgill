import { profile } from "@/content/profile";

export function MetricBand() {
  return (
    <div className="border-y border-border">
      <dl className="mx-auto grid max-w-[var(--maxw)] grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
        {profile.metrics.map((m) => (
          <div key={m.label} className="px-6 py-7">
            <dt className="font-display text-3xl font-semibold text-accent sm:text-4xl">{m.value}</dt>
            <dd className="mt-1 text-xs text-text-muted">{m.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
