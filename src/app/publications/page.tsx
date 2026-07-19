import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui";
import { SocialLinks } from "@/components/social-links";
import { publications } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Four first-author papers across neuroscience, forecasting, oncology and IoT systems.",
};

export default function PublicationsPage() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);
  return (
    <Section>
      <Container className="max-w-3xl">
        <Eyebrow>Publications</Eyebrow>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Four first-author papers.
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          24+ citations · h-index 3. Also on Google Scholar, ORCID and ResearchGate.
        </p>
        <div className="mt-6">
          <SocialLinks />
        </div>

        <ol className="mt-12 space-y-8">
          {sorted.map((p, i) => (
            <li key={i} className="border-l-2 border-border pl-5">
              <div className="mono-label flex items-center gap-2">
                <span className="text-accent">{p.year}</span>
                <span>·</span>
                <span>{p.type === "journal" ? "Journal article" : "Conference proceedings"}</span>
              </div>
              <h2 className="font-display mt-2 text-xl font-semibold leading-snug">{p.title}</h2>
              <p className="mt-1 text-sm text-text-muted">{p.authors}</p>
              <p className="mt-1 text-sm italic text-text-muted">{p.venue}</p>
              <p className="mt-3 text-sm">{p.contribution}</p>
              {p.doi && (
                <a
                  href={`https://doi.org/${p.doi}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  doi.org/{p.doi} <ArrowUpRight size={14} />
                </a>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
