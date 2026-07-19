import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/config/site";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about PhD opportunities, collaborations, or research.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <Eyebrow>{copy.contact.eyebrow}</Eyebrow>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{copy.contact.title}</h1>
        <p className="mt-4 text-lg text-text-muted">{copy.contact.lead}</p>

        <div className="mt-10 space-y-4">
          <a
            href={site.socials.email}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <Mail size={20} className="text-accent" />
            <span>
              <span className="mono-label block">Email</span>
              <span className="text-sm">{site.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5">
            <MapPin size={20} className="text-accent" />
            <span>
              <span className="mono-label block">Based in</span>
              <span className="text-sm">{site.location}</span>
            </span>
          </div>
        </div>

        <div className="mt-10">
          <p className="mono-label mb-3">{copy.contact.elsewhereLabel}</p>
          <SocialLinks />
        </div>
      </Container>
    </Section>
  );
}
