import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { Container, Section } from "@/components/ui";
import { Figure } from "@/components/figures";
import { DeconvExplorer } from "@/components/deconv-explorer";
import { EEGExplorer } from "@/components/eeg-explorer";
import { ForecastExplorer } from "@/components/forecast-explorer";
import { EMDExplorer } from "@/components/emd-explorer";
import { projects, getProject } from "@/content/projects";

/** Case studies with a bespoke interactive figure (else fall back to a static one). */
const INTERACTIVE: Record<string, ComponentType> = {
  "crohns-deconvolution": DeconvExplorer,
  "epilepsy-seizure": EEGExplorer,
  "timegpt-influenza": ForecastExplorer,
  "sfts-seasonal": EMDExplorer,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.short };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Interactive = INTERACTIVE[project.slug];

  return (
    <Section>
      <Container className="max-w-3xl">
        <Link href="/projects" className="mono-label inline-flex items-center gap-1 hover:text-accent">
          <ArrowLeft size={13} /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="mono-label">{project.domain}</span>
          <span className="text-text-muted">·</span>
          <span className="mono-label">{project.year}</span>
          <span className="text-text-muted">·</span>
          <span className="mono-label">{project.role}</span>
        </div>

        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg text-text-muted">{project.short}</p>

        {Interactive ? (
          <div className="mt-10">
            <Interactive />
          </div>
        ) : (
          project.figure !== "none" && (
            <div className="mt-10">
              <Figure kind={project.figure} />
            </div>
          )
        )}

        {/* Results */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {project.results.map((r) => (
            <div key={r.label} className="bg-surface p-4">
              <dt className="mono-label">{r.label}</dt>
              <dd className="mt-1 font-mono text-sm text-accent">{r.value}</dd>
            </div>
          ))}
        </dl>

        <div className="prose-measure mt-10 space-y-4">
          <p className="text-text-muted">{project.summary}</p>
        </div>

        <div className="mt-10">
          <p className="mono-label mb-3">Methods</p>
          <div className="flex flex-wrap gap-2">
            {project.methods.map((m) => (
              <span key={m} className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>

        {project.links && (
          <div className="mt-10 flex flex-col gap-2">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                {l.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
