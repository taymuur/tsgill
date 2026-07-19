import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="mono-label">{project.domain}</span>
        <span className="mono-label">{project.status === "ongoing" ? "ongoing" : project.year}</span>
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{project.short}</p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {project.results.slice(0, 2).map((r) => (
          <span key={r.label} className="text-sm">
            <span className="font-mono text-accent">{r.value}</span>{" "}
            <span className="text-text-muted">{r.label}</span>
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent">
        Read case study
        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
