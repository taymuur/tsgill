export type Domain = "Genomics" | "Signals" | "Forecasting" | "Systems";
export type FigureKind = "deconv" | "eeg" | "forecast" | "emd" | "none";

export type Result = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  short: string;
  domain: Domain;
  year: string;
  role: string;
  status: "published" | "ongoing";
  figure: FigureKind;
  summary: string;
  results: Result[];
  methods: string[];
  links?: { label: string; href: string }[];
  importance: number;
};

export const projects: Project[] = [
  {
    slug: "crohns-deconvolution",
    title: "Pathogenic cell types in Crohn's disease",
    short:
      "Integrating bulk and single-cell RNA-seq to predict the cell types and pathways driving Crohn's disease.",
    domain: "Genomics",
    year: "2025–present",
    role: "MSc dissertation · Earlham Institute",
    status: "ongoing",
    figure: "deconv",
    summary:
      "In silico prediction of pathogenic cell types and pathways in Crohn's disease. I integrate bulk and single-cell RNA-seq with clinical metadata across large public cohorts to identify pathogenic cell subtypes and disease-progression trajectories, then benchmark how reference choice and method assumptions drive the estimated cell-type proportions. Supervised by Prof Irene Papatheodorou and Dr Gregory Wickham.",
    results: [
      { label: "Cohorts", value: "GSE57945 · GSE93624 · GSE192786" },
      { label: "Deconvolution", value: "CIBERSORTx · MuSiC · Bisque (CATD)" },
      { label: "Single-cell", value: "EISCA QC → annotation" },
    ],
    methods: [
      "Bulk + single-cell RNA-seq integration",
      "Cell-type deconvolution (CATD pipeline)",
      "Single-cell QC, clustering, annotation (EISCA)",
      "ML on deconvolved proportions + clinical metadata",
      "Reproducible Python & R under version control",
    ],
    importance: 1,
  },
  {
    slug: "epilepsy-seizure",
    title: "MHA-CNN for epileptic seizure classification",
    short:
      "An attention-based CNN that classifies seven seizure types from EEG at 98.4% accuracy.",
    domain: "Signals",
    year: "2024",
    role: "First author",
    status: "published",
    figure: "eeg",
    summary:
      "A novel attention-based deep convolutional neural network for automated epileptic seizure classification. The model processes EEG from the Temple University Hospital Seizure Corpus, extracting 11 features (time-based correlation, eigenvalues, power spectral density, wavelet coefficients), and uses multi-head attention to focus on the most discriminative patterns across seizure types.",
    results: [
      { label: "Accuracy", value: "98.4%" },
      { label: "vs. plain CNN", value: "+15.4% (76.7% → 98.4%)" },
      { label: "Classes", value: "7 seizure types" },
      { label: "Venue", value: "Epilepsy & Behavior (Q1)" },
    ],
    methods: ["Multi-head attention", "1D CNN", "EEG feature extraction", "SHAP interpretability"],
    links: [
      {
        label: "Paper (Epilepsy & Behavior 155:109732)",
        href: "https://doi.org/10.1016/j.yebeh.2024.109732",
      },
    ],
    importance: 2,
  },
  {
    slug: "timegpt-influenza",
    title: "TimeGPT for influenza surveillance",
    short:
      "A foundation-model forecaster for influenza that beats traditional epidemiological baselines.",
    domain: "Forecasting",
    year: "2025–present",
    role: "Honorary Research Assistant · Nixon Group",
    status: "ongoing",
    figure: "forecast",
    summary:
      "An epidemiological surveillance system using the TimeGPT foundation model to forecast influenza trends, evaluated against traditional baselines at multiple horizons for the Nixon Research Group at the University of Liverpool.",
    results: [
      { label: "RMSE @ 1 week", value: "873.27" },
      { label: "Baseline", value: "Outperformed traditional models" },
      { label: "Group", value: "Nixon Group, Liverpool" },
    ],
    methods: ["TimeGPT foundation model", "Multi-horizon evaluation", "Time-series preprocessing"],
    importance: 3,
  },
  {
    slug: "sfts-seasonal",
    title: "SFTS seasonal pattern analysis",
    short:
      "Complex EMD and harmonic regression resolving multi-scale transmission cycles of a tick-borne disease.",
    domain: "Forecasting",
    year: "2025–present",
    role: "Honorary Research Assistant · Nixon Group",
    status: "ongoing",
    figure: "emd",
    summary:
      "Seasonal pattern analysis of Severe Fever with Thrombocytopenia Syndrome (SFTS) in South Korea, using complex empirical mode decomposition, harmonic regression and bicoherence analysis to resolve multi-scale transmission cycles.",
    results: [
      { label: "Harmonic fit", value: "R² = 0.848" },
      { label: "Method", value: "Complex EMD + bicoherence" },
    ],
    methods: ["Complex empirical mode decomposition", "Harmonic regression", "Bicoherence analysis"],
    importance: 4,
  },
  {
    slug: "kneevit-mri",
    title: "KneeViT — hybrid architecture for knee MRI",
    short:
      "A VGG-Transformer + ConvNet hybrid detecting ACL and meniscus injuries from MRI.",
    domain: "Signals",
    year: "2024–present",
    role: "Lead developer",
    status: "ongoing",
    figure: "none",
    summary:
      "A hybrid deep-learning model combining Vision Transformers with specialised convolutional networks (VGG features + OverLoCK ConvNet) for automated detection of ACL tears, meniscus injuries and abnormalities from knee MRI.",
    results: [
      { label: "Abnormal AUC", value: "0.919" },
      { label: "ACL AUC", value: "0.809" },
      { label: "Meniscus AUC", value: "0.760" },
      { label: "Average AUC", value: "0.845" },
    ],
    methods: ["Vision Transformer", "VGG feature extraction", "OverLoCK ConvNet"],
    importance: 5,
  },
  {
    slug: "hybrid-esn-lstm",
    title: "Hybrid ESN-LSTM for KSE-100 forecasting",
    short:
      "Echo State Networks + LSTM for stock-index forecasting with 94.12% directional accuracy.",
    domain: "Forecasting",
    year: "2024",
    role: "First author",
    status: "published",
    figure: "none",
    summary:
      "A hybrid architecture combining the efficiency of Echo State Networks with the long-term memory of LSTM for financial time-series forecasting on five years of KSE-100 data with engineered technical indicators.",
    results: [
      { label: "R²", value: "0.975" },
      { label: "Directional accuracy", value: "94.12%" },
      { label: "MAE / RMSE", value: "513.10 / 650.59" },
      { label: "Venue", value: "ICRAI 2024" },
    ],
    methods: ["Echo State Networks", "LSTM", "Technical-indicator feature engineering"],
    importance: 6,
  },
  {
    slug: "mesothelioma-ml",
    title: "Early mesothelioma detection with ML",
    short:
      "Gradient-boosted trees, SVM and logistic regression for early cancer detection.",
    domain: "Systems",
    year: "2023",
    role: "First author",
    status: "published",
    figure: "none",
    summary:
      "A machine-learning approach for early detection of mesothelioma, identifying key diagnostic features including duration of symptoms and C-reactive protein across a cohort of 98 patients.",
    results: [
      { label: "Accuracy", value: "100% (all three models)" },
      { label: "Cohort", value: "98 patients" },
      { label: "Venue", value: "Engineering Proceedings 46(1):6" },
    ],
    methods: ["Gradient Boosted Trees", "Support Vector Machines", "Logistic Regression"],
    importance: 7,
  },
  {
    slug: "iot-power-theft",
    title: "IoT smart power-theft detection",
    short:
      "A Raspberry Pi + cloud system detecting line and meter tampering in real time.",
    domain: "Systems",
    year: "2021",
    role: "Team lead (first author)",
    status: "published",
    figure: "none",
    summary:
      "An IoT system addressing Pakistan's electricity-theft problem, using PZEM-004T sensors, Raspberry Pi edge processing and ThingSpeak cloud monitoring to detect line and meter tampering in under a second. Led a team of six.",
    results: [
      { label: "Response time", value: "< 1 second" },
      { label: "Citations", value: "18" },
      { label: "Venue", value: "ICET 2021" },
    ],
    methods: ["PZEM-004T sensing", "Raspberry Pi edge compute", "ThingSpeak cloud monitoring"],
    importance: 8,
  },
  {
    slug: "eeg-acquisition",
    title: "Indigenous EEG acquisition system",
    short:
      "A low-cost research-grade EEG rig with 150× amplification and 12-bit ADC.",
    domain: "Systems",
    year: "2022",
    role: "Designer",
    status: "published",
    figure: "none",
    summary:
      "A custom EEG data-acquisition system built from the ground up — differential amplifier design for noise rejection, Arduino-based control and real-time visualisation — as an affordable alternative to commercial research equipment.",
    results: [
      { label: "Amplification", value: "150× low-noise" },
      { label: "ADC", value: "12-bit" },
      { label: "Cost reduction", value: "> 80%" },
    ],
    methods: ["Analog differential amplifier design", "Arduino DAQ", "Signal-chain optimisation"],
    importance: 9,
  },
];

export const domains: Domain[] = ["Genomics", "Signals", "Forecasting", "Systems"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
