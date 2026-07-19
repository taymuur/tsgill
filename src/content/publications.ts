export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "journal" | "proceedings";
  contribution: string;
  doi?: string;
};

export const publications: Publication[] = [
  {
    title:
      "Attention-based deep convolutional neural network for classification of generalized and focal epileptic seizures",
    authors: "Gill, T. S., Zaidi, S. S. H., & Shirazi, M. A.",
    venue: "Epilepsy & Behavior, 155, 109732",
    year: 2024,
    type: "journal",
    contribution:
      "Multi-head attention CNN reaching 98.4% accuracy across seven seizure types — a 15.4-point gain over a plain CNN.",
    doi: "10.1016/j.yebeh.2024.109732",
  },
  {
    title: "Time series forecasting of the KSE-100 index using a hybrid ESN–LSTM model",
    authors: "Gill, T. S. & Zahid, S. I.",
    venue: "2024 International Conference on Robotics and Automation in Industry (ICRAI)",
    year: 2024,
    type: "proceedings",
    contribution:
      "Echo State Network + LSTM hybrid achieving R² = 0.975 and 94.12% directional accuracy on five years of index data.",
  },
  {
    title: "Early detection of mesothelioma using machine learning algorithms",
    authors: "Gill, T. S., Shirazi, M. A., & Zaidi, S. S. H.",
    venue: "Engineering Proceedings, 46(1), 6 · 7th International Electrical Engineering Conference",
    year: 2023,
    type: "proceedings",
    contribution:
      "Three ML models reaching 100% classification accuracy on a 98-patient cohort, surfacing CRP and symptom duration as key features.",
  },
  {
    title: "IoT-based smart power quality monitoring and electricity theft detection system",
    authors:
      "Gill, T. S., Shehwar, D. E., Memon, H., Khanam, S., Ahmed, A., Shaukat, U., Mateen, A., & Zaidi, S. S. H.",
    venue:
      "2021 16th International Conference on Emerging Technologies (ICET), Islamabad, Pakistan",
    year: 2021,
    type: "proceedings",
    contribution:
      "Real-time line- and meter-tampering detection under one second; 18 citations to date.",
  },
];
