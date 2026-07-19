import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { Container, Section, Eyebrow, SectionHeading } from "@/components/ui";
import { copy } from "@/content/copy";
import { education, experience, skills } from "@/content/cv";

export const metadata: Metadata = {
  title: "CV",
  description: "Academic curriculum vitae — education, research experience, publications and skills.",
};

export default function CvPage() {
  const c = copy.cv;
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{c.title}</h1>
            <p className="mt-2 text-text-muted">{c.subtitle}</p>
          </div>
          <a
            href={c.pdfHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[var(--bg)] hover:opacity-90"
          >
            <Download size={15} /> {c.downloadLabel}
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Image
            src={c.photo}
            alt={c.title}
            width={80}
            height={80}
            className="rounded-full border border-border object-cover"
          />
          <p className="prose-measure text-sm text-text-muted">{c.blurb}</p>
        </div>

        <div className="mt-14 space-y-14">
          <div>
            <SectionHeading title="Education" />
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.degree}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
                    <span className="mono-label">{e.date}</span>
                  </div>
                  <p className="text-sm text-accent">{e.place}</p>
                  <p className="mt-1 text-sm text-text-muted">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title="Research experience" />
            <div className="space-y-5">
              {experience.map((x) => (
                <div key={x.role} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-4">
                  <div>
                    <h3 className="font-medium">{x.role}</h3>
                    <p className="text-sm text-text-muted">{x.place}</p>
                  </div>
                  <span className="mono-label">{x.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title="Technical skills" />
            <dl className="space-y-4">
              {skills.map((s) => (
                <div key={s.group} className="grid gap-1 sm:grid-cols-[200px_1fr]">
                  <dt className="mono-label pt-0.5">{s.group}</dt>
                  <dd className="text-sm text-text-muted">{s.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
