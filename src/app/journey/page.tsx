import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { JourneyMap } from "@/components/journey-map";
import { milestones } from "@/content/journey";

export const metadata: Metadata = {
  title: "Journey",
  description: "From electrical engineering in Islamabad to single-cell genomics in Norwich.",
};

const kindColor: Record<string, string> = {
  education: "var(--c2)",
  research: "var(--accent)",
  award: "var(--c6)",
};

export default function JourneyPage() {
  const sorted = [...milestones].sort((a, b) => b.sort - a.sort);
  return (
    <>
      <Section className="pb-8">
        <Container className="max-w-3xl">
          <Eyebrow>Journey</Eyebrow>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            From Islamabad to Norwich Research Park.
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            An electrical engineer who followed the signal — from EEG and image processing, through epidemiology, into
            the cells and genomes of computational biology.
          </p>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <JourneyMap />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="max-w-3xl">
          <ol className="relative border-l border-border">
            {sorted.map((m, i) => (
              <li key={i} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full ring-4 ring-[var(--bg)]"
                  style={{ background: kindColor[m.kind] }}
                  aria-hidden
                />
                <p className="mono-label">{m.date}</p>
                <h2 className="font-display mt-1 text-xl font-semibold">{m.title}</h2>
                <p className="text-sm text-accent">{m.place}</p>
                {m.city && (
                  <p className="mono-label mt-0.5">
                    {m.city}, {m.country}
                  </p>
                )}
                <p className="mt-3 text-sm text-text-muted">{m.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
