import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { MetricBand } from "@/components/metric-band";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { Figure } from "@/components/figures";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { thesisRows } from "@/content/thesis";

const featured = projects.filter((p) => [1, 2, 3, 4].includes(p.importance));
const narrative = thesisRows.filter((r) => ["epilepsy-seizure", "crohns-deconvolution", "sfts-seasonal"].includes(r.slug));
const figureFor: Record<string, "eeg" | "deconv" | "emd"> = {
  "epilepsy-seizure": "eeg",
  "crohns-deconvolution": "deconv",
  "sfts-seasonal": "emd",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Computational Biologist",
    email: profile.email,
    affiliation: ["Earlham Institute", "University of East Anglia"],
    url: "https://taymuur.github.io",
    sameAs: Object.values(profile.socials).filter((s) => s.startsWith("http")),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <MetricBand />

      {/* Thesis / narrative */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The through-line"
            title="One move, across every field."
            lead="Whether the input is a voltage trace, a transcriptome, or an epidemic curve, the work is the same: decomposing a mixed signal into the interpretable parts that explain it."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {narrative.map((row) => (
              <div key={row.slug} className="flex flex-col gap-4">
                <Figure kind={figureFor[row.slug]} />
                <div>
                  <p className="mono-label">{row.domain}</p>
                  <p className="mt-1 text-sm text-text-muted">
                    <span className="text-text">{row.signal}</span> → {row.resolved}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/research" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
              Read the full argument <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Featured work */}
      <Section className="border-t border-border">
        <Container>
          <SectionHeading eyebrow="Selected work" title="Projects with real results." />
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
              All projects <ArrowUpRight size={15} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Now */}
      <Section className="border-t border-border">
        <Container className="max-w-3xl">
          <Eyebrow>Now</Eyebrow>
          <p className="font-display mt-4 text-2xl leading-relaxed sm:text-3xl">
            Currently at the <span className="text-accent">Earlham Institute</span>, predicting the pathogenic cell
            types and pathways behind Crohn&apos;s disease from bulk and single-cell RNA-seq — while finishing an MSc in
            Data Science for Biology at the University of East Anglia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[var(--bg)] hover:opacity-90"
            >
              Get in touch
            </Link>
            <Link
              href="/journey"
              className="rounded-full border border-border px-5 py-2.5 text-sm hover:border-accent hover:text-accent"
            >
              See the journey
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
