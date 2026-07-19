import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[var(--maxw)] px-6 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mono-label flex items-center gap-2">
      <span className="inline-block h-px w-6 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg text-text-muted">{lead}</p>}
    </div>
  );
}

export function Pill({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${
        active ? "border-accent text-accent" : "border-border text-text-muted"
      }`}
    >
      {children}
    </span>
  );
}
