import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui";
import { thesisRows } from "@/content/thesis";

export const metadata: Metadata = {
  title: "Research",
  description:
    "The unifying thesis: resolving mixed signals into interpretable structure — and current work on cell-type deconvolution in Crohn's disease.",
};

const methods = [
  "Cell-type deconvolution (CIBERSORTx · MuSiC · Bisque)",
  "Bulk + single-cell RNA-seq integration",
  "Single-cell QC, clustering & annotation (EISCA)",
  "Multi-omics integration",
  "Attention mechanisms & transformers",
  "Complex empirical mode decomposition",
  "Harmonic regression",
  "Explainable AI (SHAP)",
];

export default function ResearchPage() {
  return (
    <>
      <Section className="pb-8">
        <Container className="max-w-3xl">
          <Eyebrow>Research</Eyebrow>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Resolving complex data into the parts that explain it.
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            I am a computational biologist interested in how transcriptomic data can be resolved into the cell types and
            pathways that shape phenotype. My wider interest is in methods development and benchmarking for deconvolution
            and multi-omics integration — and in machine learning that stays interpretable when it is used to make
            biological claims.
          </p>
        </Container>
      </Section>

      {/* The move */}
      <Section className="border-t border-border pt-16">
        <Container>
          <SectionHeading
            eyebrow="The move"
            title="Decomposition into interpretable structure."
            lead="The same intellectual step recurs across every domain I've worked in."
          />
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
            <SectionHeading eyebrow="Current work" title="Pathogenic cell types in Crohn's disease." />
            <div className="prose-measure space-y-4 text-text-muted">
              <p>
                My MSc dissertation at the Earlham Institute predicts pathogenic cell types and pathways in Crohn&apos;s
                disease in silico. I integrate bulk and single-cell RNA-seq with clinical metadata across large public
                cohorts — including <span className="font-mono text-text">GSE57945</span>,{" "}
                <span className="font-mono text-text">GSE93624</span> and{" "}
                <span className="font-mono text-text">GSE192786</span> — to identify pathogenic subtypes and
                disease-progression trajectories.
              </p>
              <p>
                I benchmark cell-type deconvolution of bulk RNA-seq using CIBERSORTx, MuSiC and Bisque within the CATD
                pipeline, quantifying how reference choice and method assumptions drive differences in estimated
                proportions. Single-cell data runs through the EISCA pipeline for QC, normalisation, clustering and
                annotation, with reproducible Python and R workflows under version control.
              </p>
              <p>Supervised by Prof Irene Papatheodorou and Dr Gregory Wickham, Papatheodorou Group.</p>
            </div>
          </div>
          <div>
            <p className="mono-label mb-4">Methods I work in</p>
            <ul className="space-y-2 text-sm">
              {methods.map((m) => (
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
          <SectionHeading eyebrow="How I work" title="Reproducible, openly shared pipelines." />
          <p className="prose-measure text-text-muted">
            I care about reproducible, openly shared pipelines that let methods transfer between systems and species —
            Linux, Git, high-performance computing, and FAIR data by default. If a result depends on a modelling choice,
            I want that choice measured and documented, not hidden.
          </p>
        </Container>
      </Section>
    </>
  );
}
