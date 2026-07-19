export type Milestone = {
  date: string;
  sort: number;
  kind: "education" | "research" | "award";
  title: string;
  place: string;
  city: string;
  country: string;
  body: string;
};

/** Reverse-chronological career + education arc: Islamabad → Stuttgart → Liverpool → Norwich. */
export const milestones: Milestone[] = [
  {
    date: "Nov 2025 – present",
    sort: 202511,
    kind: "research",
    title: "Visiting Student Researcher, Papatheodorou Group",
    place: "Earlham Institute, Norwich Research Park",
    city: "Norwich",
    country: "United Kingdom",
    body: "Integrating bulk and single-cell RNA-seq with clinical metadata across large public Crohn's disease cohorts; benchmarking deconvolution (CIBERSORTx, MuSiC, Bisque) in the CATD pipeline and running single-cell workflows through EISCA.",
  },
  {
    date: "Sep 2025 – present",
    sort: 202509,
    kind: "education",
    title: "MSc Data Science for Biology",
    place: "University of East Anglia",
    city: "Norwich",
    country: "United Kingdom",
    body: "Dissertation on in silico prediction of pathogenic cell types and pathways in Crohn's disease. Modules: Data Science & Bioinformatics; Statistics for Biologists; Data Mining.",
  },
  {
    date: "May 2025 – present",
    sort: 202505,
    kind: "research",
    title: "Honorary Research Assistant, Nixon Research Group",
    place: "University of Liverpool",
    city: "Liverpool",
    country: "United Kingdom",
    body: "Evaluated TimeGPT for influenza surveillance (RMSE 873.27 @ 1 week) and led a seasonal-pattern analysis of SFTS in South Korea using complex EMD and harmonic regression (R² = 0.848).",
  },
  {
    date: "2025 – present",
    sort: 202501,
    kind: "research",
    title: "Data Analyst Intern (REF2029)",
    place: "Research & Innovation Services, University of East Anglia",
    city: "Norwich",
    country: "United Kingdom",
    body: "Modelling how proxy indicators relate to output-level GPA using REF 2021 and OpenAlex bibliometric data, validating measures with Unit of Assessment coordinators.",
  },
  {
    date: "Feb 2024",
    sort: 202402,
    kind: "award",
    title: "First-author paper in Epilepsy & Behavior",
    place: "Epilepsy & Behavior (Q1)",
    city: "",
    country: "",
    body: "Attention-based CNN achieving 98.4% accuracy in seizure classification.",
  },
  {
    date: "Nov 2022 – May 2023",
    sort: 202211,
    kind: "research",
    title: "Data Science Intern",
    place: "AddiTechSim, University of Stuttgart",
    city: "Stuttgart",
    country: "Germany",
    body: "Applied deep reinforcement learning (Stable-Baselines3, OpenAI Gymnasium) to a parameter-optimisation problem, converging 98% faster than the existing Q-learning approach.",
  },
  {
    date: "Sep 2019 – Jun 2023",
    sort: 201909,
    kind: "education",
    title: "BEng Electrical Engineering",
    place: "National University of Sciences and Technology (NUST)",
    city: "Islamabad",
    country: "Pakistan",
    body: "Foundations in machine learning, digital image processing, and signal processing. Co-founded the NUST Robotics and Artificial Intelligence Society.",
  },
];

/** Approximate coordinates for the journey map. */
export const places = [
  { city: "Islamabad", country: "Pakistan", lat: 33.6844, lng: 73.0479, order: 1 },
  { city: "Stuttgart", country: "Germany", lat: 48.7758, lng: 9.1829, order: 2 },
  { city: "Liverpool", country: "United Kingdom", lat: 53.4084, lng: -2.9916, order: 3 },
  { city: "Norwich", country: "United Kingdom", lat: 52.6309, lng: 1.2974, order: 4 },
];
