import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui";
import { copy } from "@/content/copy";
import { thesisRows } from "@/content/thesis";

export const metadata: Metadata = {
  title: "Research",
  description: copy.research.intro.slice(0, 155),
};

export default function ResearchPage() {
  const c = copy.research;
  return (
    <>
      <Section className="pb-8">
        <Container className="max-w-3xl">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-6 text-lg text-text-muted">{c.intro}</p>
        </Container>
      </Section>

      {/* The move */}
      <Section className="border-t border-border pt-16">
        <Container>
          <SectionHeading eyebrow={c.move.eyebrow} title={c.move.title} lead={c.move.lead} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="mono-label border-b border-border [&>th]:py-3 [&>th]:pr-4 [&>th]:font-normal">
                  <th>Domain</th>
                  <th>Mixed signal</th>
                  <th>Resolved into</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {thesisRows.map((r) => (
                  <tr key={r.slug} className="border-b border-border/60 [&>td]:py-4 [&>td]:pr-4">
                    <td className="font-medium">{r.domain}</td>
                    <td className="text-text-muted">{r.signal}</td>
                    <td className="text-accent">{r.resolved}</td>
                    <td>
                      <Link href={`/projects/${r.slug}`} className="text-text-muted hover:text-accent">
                        {r.project}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Current work */}
      <Section className="border-t border-border">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow={c.current.eyebrow} title={c.current.title} />
            <div className="prose-measure space-y-4 text-text-muted">
              {c.current.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="mono-label mb-4">{c.current.methodsLabel}</p>
            <ul className="space-y-2 text-sm">
              {c.current.methods.map((m) => (
                <li key={m} className="flex gap-2 text-text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* How I work */}
      <Section className="border-t border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={c.how.eyebrow} title={c.how.title} />
          <p className="prose-measure text-text-muted">{c.how.body}</p>
        </Container>
      </Section>
    </>
  );
}
