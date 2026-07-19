import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui";
import { SocialLinks } from "@/components/social-links";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about PhD opportunities, collaborations in computational biology, or research.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let&apos;s talk.</h1>
        <p className="mt-4 text-lg text-text-muted">
          I&apos;d especially like to hear from PhD supervisors and collaborators working on deconvolution, single-cell
          methods, multi-omics integration, or interpretable ML for biology.
        </p>

        <div className="mt-10 space-y-4">
          <a
            href={profile.socials.email}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <Mail size={20} className="text-accent" />
            <span>
              <span className="mono-label block">Email</span>
              <span className="text-sm">{profile.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5">
            <MapPin size={20} className="text-accent" />
            <span>
              <span className="mono-label block">Based in</span>
              <span className="text-sm">{profile.location}</span>
            </span>
          </div>
        </div>

        <div className="mt-10">
          <p className="mono-label mb-3">Find me elsewhere</p>
          <SocialLinks />
        </div>
      </Container>
    </Section>
  );
}
