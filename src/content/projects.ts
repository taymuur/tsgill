/* ══════════════════════════════════════════════════════════════════════════
 *  PROJECTS — one entry per case study.
 *  Everything shown on /projects and /projects/[slug] comes from here, including
 *  the interactive figure. To change a figure, edit its `figure` data below —
 *  you never need to touch component code. Set `figure: { type: "none" }` to
 *  omit it. See CONTENT.md for the figure types and their fields.
 * ════════════════════════════════════════════════════════════════════════ */

export type Domain = "Genomics" | "Signals" | "Forecasting" | "Systems";

export type Result = { label: string; value: string };

/** Colors accept a CSS var like "var(--c1)" or any hex string. */
export type FigureSpec =
  | { type: "none" }
  /** Stacked-proportion bar with switchable presets (e.g. methods/references). */
  | {
      type: "proportions";
      caption?: string;
      note?: string;
      categories: { label: string; color: string }[];
      /** Each option's `values` align 1:1 with `categories` and should sum to ~100. */
      options: { name: string; values: number[] }[];
    }
  /** Multi-row waveform with a moving highlight window and switchable presets. */
  | {
      type: "signal";
      caption?: string;
      note?: string;
      rows?: number;
      highlightLabel?: string;
      readout?: Result;
      presets: { key: string; label: string; freq: number; chaos: number; focus: number }[];
    }
  /** History curve + adjustable forecast horizon with a scaling readout. */
  | {
      type: "timeseries";
      caption?: string;
      note?: string;
      controlLabel?: string;
      unit?: string;
      readoutLabel?: string;
      baseValue?: number;
      title?: string;
    }
  /** Stack of toggleable component waves that sum into a reconstruction. */
  | {
      type: "layers";
      caption?: string;
      note?: string;
      readout?: Result;
      layers: { label: string; freq: number; amp: number; color: string }[];
    };

export type Project = {
  slug: string;
  title: string;
  short: string;
  domain: Domain;
  year: string;
  role: string;
  status: "published" | "ongoing";
  figure: FigureSpec;
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
    figure: {
      type: "proportions",
      caption: "Estimated composition · one bulk sample",
      note: "Schematic · reference & method choice drive the estimate (CATD benchmarking)",
      categories: [
        { label: "Epithelial", color: "var(--c1)" },
        { label: "T cells", color: "var(--c2)" },
        { label: "B / Plasma", color: "var(--c4)" },
        { label: "Myeloid", color: "var(--c3)" },
        { label: "Fibroblasts", color: "var(--c6)" },
        { label: "Endothelial", color: "var(--c5)" },
        { label: "Other", color: "var(--c7)" },
      ],
      options: [
        { name: "CIBERSORTx", values: [34, 22, 14, 12, 9, 5, 4] },
        { name: "MuSiC", values: [41, 17, 11, 10, 12, 6, 3] },
        { name: "Bisque", values: [28, 26, 16, 14, 8, 5, 3] },
      ],
    },
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
    figure: {
      type: "signal",
      caption: "EEG · multi-head attention",
      note: "Attention focuses on the discriminative window (illustrative traces)",
      highlightLabel: "attention",
      rows: 5,
      readout: { label: "test accuracy", value: "98.4%" },
      presets: [
        { key: "FNSZ", label: "Focal non-specific", freq: 9, chaos: 0.5, focus: 0.25 },
        { key: "GNSZ", label: "Generalized non-specific", freq: 6, chaos: 0.9, focus: 0.5 },
        { key: "SPSZ", label: "Simple partial", freq: 12, chaos: 0.3, focus: 0.15 },
        { key: "CPSZ", label: "Complex partial", freq: 8, chaos: 0.6, focus: 0.4 },
        { key: "ABSZ", label: "Absence", freq: 3, chaos: 0.2, focus: 0.55 },
        { key: "TNSZ", label: "Tonic", freq: 14, chaos: 0.7, focus: 0.35 },
        { key: "TCSZ", label: "Tonic-clonic", freq: 5, chaos: 1.0, focus: 0.6 },
      ],
    },
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
    figure: {
      type: "timeseries",
      title: "Influenza forecast · TimeGPT",
      caption: "Drag the horizon to extend the forecast",
      note: "Error grows with horizon · RMSE anchored at 873.27 @ 1 week (illustrative scaling)",
      controlLabel: "horizon",
      unit: "w",
      readoutLabel: "RMSE",
      baseValue: 873.27,
    },
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
    figure: {
      type: "layers",
      caption: "Complex EMD",
      note: "Toggle modes to see how multi-scale cycles sum to the observed signal (illustrative)",
      readout: { label: "harmonic fit", value: "R² = 0.848" },
      layers: [
        { label: "IMF 1 · high-freq noise", freq: 5, amp: 8, color: "var(--c7)" },
        { label: "IMF 2 · sub-seasonal", freq: 13, amp: 12, color: "var(--c4)" },
        { label: "IMF 3 · seasonal", freq: 34, amp: 16, color: "var(--c1)" },
        { label: "IMF 4 · annual trend", freq: 80, amp: 11, color: "var(--c6)" },
      ],
    },
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
    short: "A VGG-Transformer + ConvNet hybrid detecting ACL and meniscus injuries from MRI.",
    domain: "Signals",
    year: "2024–present",
    role: "Lead developer",
    status: "ongoing",
    figure: { type: "none" },
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
    short: "Echo State Networks + LSTM for stock-index forecasting with 94.12% directional accuracy.",
    domain: "Forecasting",
    year: "2024",
    role: "First author",
    status: "published",
    figure: { type: "none" },
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
    short: "Gradient-boosted trees, SVM and logistic regression for early cancer detection.",
    domain: "Systems",
    year: "2023",
    role: "First author",
    status: "published",
    figure: { type: "none" },
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
    short: "A Raspberry Pi + cloud system detecting line and meter tampering in real time.",
    domain: "Systems",
    year: "2021",
    role: "Team lead (first author)",
    status: "published",
    figure: { type: "none" },
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
    short: "A low-cost research-grade EEG rig with 150× amplification and 12-bit ADC.",
    domain: "Systems",
    year: "2022",
    role: "Designer",
    status: "published",
    figure: { type: "none" },
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
