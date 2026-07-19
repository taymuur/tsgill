import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { ProjectFilter } from "./project-filter";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies across genomics, signals, forecasting and systems — each with real methods and results.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => a.importance - b.importance);
  return (
    <Section>
      <Container>
        <Eyebrow>Projects</Eyebrow>
        <h1 className="font-display mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Nine projects, four fields, one method.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-muted">
          Filter by domain. Every case study keeps the real numbers.
        </p>
        <div className="mt-12">
          <ProjectFilter projects={sorted} />
        </div>
      </Container>
    </Section>
  );
}
