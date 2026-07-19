/* ══════════════════════════════════════════════════════════════════════════
 *  PAGE COPY — all the headings and paragraphs shown on each page.
 *  Edit the text here; the pages render whatever you put in. Markdown is not
 *  processed — plain text only. Use the list files in src/content/* for the
 *  projects, publications, and timeline entries.
 * ════════════════════════════════════════════════════════════════════════ */

export const copy = {
  home: {
    thesis: {
      eyebrow: "The through-line",
      title: "One move, across every field.",
      lead: "Whether the input is a voltage trace, a transcriptome, or an epidemic curve, the work is the same: decomposing a mixed signal into the interpretable parts that explain it.",
      moreLabel: "Read the full argument",
      moreHref: "/research",
    },
    featured: {
      eyebrow: "Selected work",
      title: "Projects with real results.",
      allLabel: "All projects",
    },
    now: {
      eyebrow: "Now",
      // {accent} is rendered in the accent color.
      body: "Currently at the {accent}, predicting the pathogenic cell types and pathways behind Crohn's disease from bulk and single-cell RNA-seq — while finishing an MSc in Data Science for Biology at the University of East Anglia.",
      accent: "Earlham Institute",
      ctas: [
        { label: "Get in touch", href: "/contact", variant: "solid" },
        { label: "See the journey", href: "/journey", variant: "outline" },
      ],
    },
  },

  research: {
    eyebrow: "Research",
    title: "Resolving complex data into the parts that explain it.",
    intro:
      "I am a computational biologist interested in how transcriptomic data can be resolved into the cell types and pathways that shape phenotype. My wider interest is in methods development and benchmarking for deconvolution and multi-omics integration — and in machine learning that stays interpretable when it is used to make biological claims.",
    move: {
      eyebrow: "The move",
      title: "Decomposition into interpretable structure.",
      lead: "The same intellectual step recurs across every domain I've worked in.",
    },
    current: {
      eyebrow: "Current work",
      title: "Pathogenic cell types in Crohn's disease.",
      paragraphs: [
        "My MSc dissertation at the Earlham Institute predicts pathogenic cell types and pathways in Crohn's disease in silico. I integrate bulk and single-cell RNA-seq with clinical metadata across large public cohorts — including GSE57945, GSE93624 and GSE192786 — to identify pathogenic subtypes and disease-progression trajectories.",
        "I benchmark cell-type deconvolution of bulk RNA-seq using CIBERSORTx, MuSiC and Bisque within the CATD pipeline, quantifying how reference choice and method assumptions drive differences in estimated proportions. Single-cell data runs through the EISCA pipeline for QC, normalisation, clustering and annotation, with reproducible Python and R workflows under version control.",
        "Supervised by Prof Irene Papatheodorou and Dr Gregory Wickham, Papatheodorou Group.",
      ],
      methodsLabel: "Methods I work in",
      methods: [
        "Cell-type deconvolution (CIBERSORTx · MuSiC · Bisque)",
        "Bulk + single-cell RNA-seq integration",
        "Single-cell QC, clustering & annotation (EISCA)",
        "Multi-omics integration",
        "Attention mechanisms & transformers",
        "Complex empirical mode decomposition",
        "Harmonic regression",
        "Explainable AI (SHAP)",
      ],
    },
    how: {
      eyebrow: "How I work",
      title: "Reproducible, openly shared pipelines.",
      body: "I care about reproducible, openly shared pipelines that let methods transfer between systems and species — Linux, Git, high-performance computing, and FAIR data by default. If a result depends on a modelling choice, I want that choice measured and documented, not hidden.",
    },
  },

  projects: {
    eyebrow: "Projects",
    title: "Nine projects, four fields, one method.",
    lead: "Filter by domain. Every case study keeps the real numbers.",
  },

  publications: {
    eyebrow: "Publications",
    title: "Four first-author papers.",
    lead: "24+ citations · h-index 3. Also on Google Scholar, ORCID and ResearchGate.",
  },

  journey: {
    eyebrow: "Journey",
    title: "From Islamabad to Norwich Research Park.",
    lead: "An electrical engineer who followed the signal — from EEG and image processing, through epidemiology, into the cells and genomes of computational biology.",
  },

  cv: {
    eyebrow: "Curriculum Vitae",
    title: "Taimur Shahzad Gill",
    subtitle: "Computational biologist · Norwich, UK",
    downloadLabel: "Download PDF",
    /** Put your CV PDF in /public and point to it here. */
    pdfHref: "/Taimur-Shahzad-Gill-CV.pdf",
    blurb:
      "Computational biologist interested in resolving transcriptomic data into the cell types and pathways that shape phenotype, with a background spanning signal processing, machine learning and epidemiology.",
    photo: "/prof.jpg",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk.",
    lead: "I'd especially like to hear from PhD supervisors and collaborators working on deconvolution, single-cell methods, multi-omics integration, or interpretable ML for biology.",
    elsewhereLabel: "Find me elsewhere",
  },
} as const;
