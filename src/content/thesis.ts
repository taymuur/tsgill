/** The unifying "decomposition" argument — one row per domain. */
export type ThesisRow = {
  domain: string;
  signal: string;
  resolved: string;
  project: string;
  slug: string;
};

export const thesisRows: ThesisRow[] = [
  {
    domain: "Neuroscience",
    signal: "Raw EEG",
    resolved: "7 seizure types (attention)",
    project: "MHA-CNN · Epilepsy & Behavior",
    slug: "epilepsy-seizure",
  },
  {
    domain: "Genomics",
    signal: "Bulk RNA-seq",
    resolved: "Cell-type proportions (deconvolution)",
    project: "Crohn's dissertation · Earlham",
    slug: "crohns-deconvolution",
  },
  {
    domain: "Epidemiology",
    signal: "Time series",
    resolved: "Seasonal cycles (Complex EMD)",
    project: "SFTS · Nixon Group",
    slug: "sfts-seasonal",
  },
  {
    domain: "Public health",
    signal: "Flu counts",
    resolved: "Forecasted horizon",
    project: "TimeGPT surveillance",
    slug: "timegpt-influenza",
  },
  {
    domain: "Finance",
    signal: "Price series",
    resolved: "Trend + memory",
    project: "ESN-LSTM · KSE-100",
    slug: "hybrid-esn-lstm",
  },
];
