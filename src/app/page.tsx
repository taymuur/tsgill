import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { MetricBand } from "@/components/metric-band";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { ProjectFigure } from "@/components/figures/project-figure";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/site-url";
import { copy } from "@/content/copy";
import { projects } from "@/content/projects";
import { thesisRows } from "@/content/thesis";

const featured = projects.filter((p) => [1, 2, 3, 4].includes(p.importance));
// The narrative shows a few projects that carry an interactive figure.
const narrative = projects
  .filter((p) => p.figure.type !== "none")
  .slice(0, 3)
  .map((p) => ({ project: p, row: thesisRows.find((r) => r.slug === p.slug) }));

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    email: site.email,
    url: siteUrl(),
    sameAs: Object.values(site.socials).filter((s) => s.startsWith("http")),
  };

  const nowParts = copy.home.now.body.split("{accent}");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <MetricBand />

      {/* Thesis / narrative */}
      <Section>
        <Container>
          <SectionHeading eyebrow={copy.home.thesis.eyebrow} title={copy.home.thesis.title} lead={copy.home.thesis.lead} />
          <div className="grid gap-6 lg:grid-cols-3">
            {narrative.map(({ project, row }) => (
              <div key={project.slug} className="flex flex-col gap-4">
                <ProjectFigure spec={project.figure} />
                <div>
                  <p className="mono-label">{row?.domain ?? project.domain}</p>
                  {row && (
                    <p className="mt-1 text-sm text-text-muted">
                      <span className="text-text">{row.signal}</span> → {row.resolved}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href={copy.home.thesis.moreHref} className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
              {copy.home.thesis.moreLabel} <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Featured work */}
      <Section className="border-t border-border">
        <Container>
          <SectionHeading eyebrow={copy.home.featured.eyebrow} title={copy.home.featured.title} />
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
              {copy.home.featured.allLabel} <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Now */}
      <Section className="border-t border-border">
        <Container className="max-w-3xl">
          <Eyebrow>{copy.home.now.eyebrow}</Eyebrow>
          <p className="font-display mt-4 text-2xl leading-relaxed sm:text-3xl">
            {nowParts[0]}
            <span className="text-accent">{copy.home.now.accent}</span>
            {nowParts[1]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {copy.home.now.ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.variant === "outline"
                    ? "rounded-full border border-border px-5 py-2.5 text-sm hover:border-accent hover:text-accent"
                    : "rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[var(--bg)] hover:opacity-90"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
