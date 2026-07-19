"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { domains, type Domain, type Project } from "@/content/projects";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Domain | "All">("All");
  const filters: (Domain | "All")[] = ["All", ...domains];
  const shown = active === "All" ? projects : projects.filter((p) => p.domain === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === f
                ? "border-accent bg-accent text-[var(--bg)]"
                : "border-border text-text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
