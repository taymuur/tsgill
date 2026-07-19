import { Mail, GraduationCap, BookOpen, Fingerprint } from "lucide-react";
import type { SVGProps } from "react";
import { site } from "@/config/site";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17} aria-hidden {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17} aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

const items = [
  { key: "github", label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { key: "scholar", label: "Google Scholar", href: site.socials.scholar, Icon: GraduationCap },
  { key: "orcid", label: "ORCID", href: site.socials.orcid, Icon: Fingerprint },
  { key: "researchgate", label: "ResearchGate", href: site.socials.researchgate, Icon: BookOpen },
  { key: "email", label: "Email", href: site.socials.email, Icon: Mail },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items
        .filter((i) => i.href)
        .map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target={key === "email" ? undefined : "_blank"}
          rel="noreferrer noopener"
          aria-label={label}
          title={label}
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Icon width={17} height={17} />
        </a>
      ))}
    </div>
  );
}
