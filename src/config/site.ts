/* ══════════════════════════════════════════════════════════════════════════
 *  SITE CONFIG — edit this file to change the whole site.
 *
 *  Nothing here is wired to a specific topic. Change the text, links, metrics,
 *  navigation, and hero background from this one file. No component code needs
 *  to be touched. Colors and fonts live in `src/app/globals.css` (see the
 *  ":root" block near the top) and `src/app/layout.tsx`.
 *
 *  Longer page copy lives in `src/content/copy.ts`.
 *  List content (projects, publications, timeline) lives in `src/content/*`.
 *  See CONTENT.md for the full editing guide.
 * ════════════════════════════════════════════════════════════════════════ */

export type Cta = { label: string; href: string; variant?: "solid" | "outline" };

export const site = {
  /* ---- Identity -------------------------------------------------------- */
  name: "Taimur Shahzad Gill",
  /** Shown in the top-left nav; usually first name or initials. */
  brand: "Taimur",
  email: "taimuur.shahzad@gmail.com",
  location: "Norwich, United Kingdom",

  /* ---- Hero (the first screen) ---------------------------------------- */
  hero: {
    eyebrow: "Computational Biologist · Norwich, UK",
    heading: "Taimur Shahzad Gill",
    subheading:
      "I take complex, mixed signals and resolve them into the interpretable parts that actually explain the phenomenon.",
    ctas: [
      { label: "See the research", href: "/research", variant: "solid" },
      { label: "Browse projects", href: "/projects", variant: "outline" },
    ] as Cta[],
    scrollHint: "Watch the signal resolve",

    /* The animated background. Purely decorative and topic-agnostic —
     * change `palette`, `mode`, and counts to restyle it. */
    background: {
      /** "clusters" = a blob that resolves into groups; "field" = a calm drift. */
      mode: "clusters" as "clusters" | "field",
      /** How many groups the points settle into (clusters mode). */
      groups: 7,
      /** Point count. Lower = faster on weak devices. */
      count: 7000,
      /** Any list of CSS colors. The background cycles through them. */
      palette: ["#35e0c2", "#7c9cff", "#ff8a5b", "#b98cff", "#4ed8ff", "#ffd166", "#f871a0"],
    },
  },

  /* ---- Navigation ------------------------------------------------------ */
  nav: [
    { label: "Research", href: "/research" },
    { label: "Projects", href: "/projects" },
    { label: "Publications", href: "/publications" },
    { label: "Journey", href: "/journey" },
    { label: "CV", href: "/cv" },
  ],
  /** The highlighted button on the right of the nav. Set to null to hide. */
  navCta: { label: "Get in touch", href: "/contact" } as Cta | null,

  /* ---- Metric band (the row of numbers under the hero) ----------------- */
  /** Add, remove, or reorder freely. Empty array hides the band. */
  metrics: [
    { value: "4", label: "first-author papers" },
    { value: "98.4%", label: "seizure classification accuracy" },
    { value: "24+", label: "citations" },
    { value: "3", label: "h-index" },
    { value: "1,310+", label: "research hours" },
  ],

  /* ---- Social / profile links ----------------------------------------- */
  /** Set any value to "" to hide that icon. */
  socials: {
    github: "https://github.com/taymuur",
    linkedin: "https://linkedin.com/in/taimur-shahzad-gill",
    scholar: "https://scholar.google.com/citations?user=Q3eFoOMAAAAJ",
    orcid: "https://orcid.org/0000-0003-2467-1688",
    researchgate: "https://www.researchgate.net/profile/Taimur_Gill",
    email: "mailto:taimuur.shahzad@gmail.com",
  },

  /* ---- Footer ---------------------------------------------------------- */
  footer: {
    tagline: "From signals to cells.",
  },

  /* ---- SEO ------------------------------------------------------------- */
  seo: {
    /** Deployed origin, used for absolute URLs in metadata. */
    url: "https://taymuur.github.io",
    title: "Taimur Shahzad Gill — Computational Biologist",
    description:
      "Computational biologist resolving transcriptomic data into the cell types and pathways that shape disease — across genomics, neuroscience, epidemiology and forecasting.",
  },
};

export type SocialKey = keyof typeof site.socials;
