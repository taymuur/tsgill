export const profile = {
  name: "Taimur Shahzad Gill",
  roles: [
    "Computational Biologist",
    "Visiting Student Researcher · Earlham Institute",
    "MSc Data Science for Biology · University of East Anglia",
  ],
  location: "Norwich, United Kingdom",
  email: "taimuur.shahzad@gmail.com",
  tagline: "From signals to cells.",
  thesis:
    "I take complex, mixed signals and resolve them into the interpretable parts that actually explain the phenomenon.",
  blurb:
    "A computational biologist working at the Earlham Institute and the University of East Anglia. My research resolves transcriptomic data into the cell types and pathways that shape disease — currently benchmarking cell-type deconvolution and single-cell workflows to predict pathogenic cell types in Crohn's disease. Across neuroscience, epidemiology and genomics, my work has been the same move: decomposing a mixed signal into interpretable structure.",
  socials: {
    github: "https://github.com/taymuur",
    linkedin: "https://linkedin.com/in/taimur-shahzad-gill",
    scholar: "https://scholar.google.com/citations?user=Q3eFoOMAAAAJ",
    orcid: "https://orcid.org/0000-0003-2467-1688",
    researchgate: "https://www.researchgate.net/profile/Taimur_Gill",
    email: "mailto:taimuur.shahzad@gmail.com",
  },
  metrics: [
    { value: "4", label: "first-author papers" },
    { value: "98.4%", label: "seizure classification accuracy" },
    { value: "24+", label: "citations" },
    { value: "3", label: "h-index" },
    { value: "1,310+", label: "research hours" },
  ],
} as const;

export type Social = keyof typeof profile.socials;
