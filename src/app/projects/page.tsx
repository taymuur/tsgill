import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { ProjectFilter } from "./project-filter";
import { projects } from "@/content/projects";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Projects",
  description: copy.projects.lead,
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => a.importance - b.importance);
  return (
    <Section>
      <Container>
        <Eyebrow>{copy.projects.eyebrow}</Eyebrow>
        <h1 className="font-display mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.projects.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-muted">{copy.projects.lead}</p>
        <div className="mt-12">
          <ProjectFilter projects={sorted} />
        </div>
      </Container>
    </Section>
  );
}
