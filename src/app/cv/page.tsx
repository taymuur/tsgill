import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { Container, Section, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "CV",
  description: "Academic curriculum vitae — education, research experience, publications and skills.",
};

const education = [
  {
    degree: "MSc Data Science for Biology",
    place: "University of East Anglia, Norwich",
    date: "Sep 2025 – Present",
    detail: "Dissertation at the Earlham Institute. Modules: Data Science & Bioinformatics; Statistics for Biologists; Data Mining.",
  },
  {
    degree: "BEng Electrical Engineering",
    place: "National University of Sciences and Technology (NUST), Islamabad",
    date: "Sep 2019 – Jun 2023",
    detail: "Machine Learning (A), Digital Image Processing (A), AI & Decision Support (B+), Digital Signal Processing (B+).",
  },
];

const experience = [
  {
    role: "Visiting Student Researcher, Papatheodorou Group",
    place: "Earlham Institute, Norwich Research Park",
    date: "Nov 2025 – Present",
  },
  {
    role: "Honorary Research Assistant, Nixon Research Group",
    place: "University of Liverpool",
    date: "May 2025 – Present",
  },
  {
    role: "Data Analyst Intern (REF2029)",
    place: "Research & Innovation Services, University of East Anglia",
    date: "2025 – Present",
  },
  {
    role: "Data Science Intern",
    place: "AddiTechSim, University of Stuttgart",
    date: "Nov 2022 – May 2023",
  },
];

const skills = [
  { group: "Genomics & bioinformatics", items: "bulk & single-cell RNA-seq · deconvolution (CIBERSORTx, MuSiC, Bisque) · CATD · EISCA · multi-omics integration · GEO" },
  { group: "Programming", items: "Python (pandas, NumPy, scikit-learn, Scanpy) · R (Seurat, Bioconductor, tidyverse) · Bash · SQL · C/C++" },
  { group: "ML & statistics", items: "deep learning · attention & transformers · reinforcement learning · time-series forecasting · harmonic regression · explainable AI (SHAP)" },
  { group: "Reproducibility", items: "Linux · Git & GitHub · HPC · LaTeX · FAIR principles" },
  { group: "Languages", items: "English (IELTS 7.5) · Urdu (native) · Hindi (basic) · Spanish (beginner)" },
];

export default function CvPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Curriculum Vitae</Eyebrow>
            <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Taimur Shahzad Gill
            </h1>
            <p className="mt-2 text-text-muted">Computational biologist · Norwich, UK</p>
          </div>
          <a
            href="/Taimur-Shahzad-Gill-CV.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[var(--bg)] hover:opacity-90"
          >
            <Download size={15} /> Download PDF
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Image
            src="/prof.jpg"
            alt="Taimur Shahzad Gill"
            width={80}
            height={80}
            className="rounded-full border border-border object-cover"
          />
          <p className="prose-measure text-sm text-text-muted">
            Computational biologist interested in resolving transcriptomic data into the cell types and pathways that
            shape phenotype, with a background spanning signal processing, machine learning and epidemiology.
          </p>
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
