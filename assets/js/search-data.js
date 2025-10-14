// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/tsgill/";
    },
  },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/tsgill/books/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "A collection of my research publications and academic contributions.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/tsgill/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "AI and machine learning research projects advancing healthcare and technology",
          section: "Navigation",
          handler: () => {
            window.location.href = "/tsgill/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Explore my open-source projects and contributions on GitHub.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/tsgill/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Comprehensive CV showcasing research experience, publications, technical skills, and academic achievements in AI and data science.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/tsgill/cv/";
          },
        },{id: "books-21-lessons-for-the-21st-century",
          title: '21 Lessons for the 21st Century',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/21_lessons_21st_century/";
            },},{id: "books-the-48-laws-of-power",
          title: 'The 48 Laws of Power',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/48_laws_of_power/";
            },},{id: "books-artificial-intelligence-a-modern-approach",
          title: 'Artificial Intelligence - A Modern Approach',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/artificial_intelligence_modern_approach/";
            },},{id: "books-deep-learning",
          title: 'Deep Learning',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/deep_learning_goodfellow/";
            },},{id: "books-fluent-python",
          title: 'Fluent Python',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/fluent_python/";
            },},{id: "books-hands-on-machine-learning-with-scikit-learn-keras-amp-tensorflow",
          title: 'Hands-On Machine Learning with Scikit-Learn, Keras &amp;amp; TensorFlow',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/hands_on_machine_learning/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/tsgill/books/the_godfather/";
            },},{id: "news-first-author-paper-published-in-epilepsy-amp-amp-behavior-achieving-98-4-accuracy-in-seizure-classification-star",
          title: 'First-author paper published in Epilepsy &amp;amp;amp; Behavior achieving 98.4% accuracy in seizure classification!...',
          description: "",
          section: "News",},{id: "news-joined-nixon-research-group-at-university-of-liverpool-as-honorary-research-assistant-tada",
          title: 'Joined Nixon Research Group at University of Liverpool as Honorary Research Assistant! :tada:...',
          description: "",
          section: "News",},{id: "news-started-masters-in-data-science-for-biology-at-university-of-east-anglia-mortar-board",
          title: 'Started Masters in Data Science for Biology at University of East Anglia! :mortar_board:...',
          description: "",
          section: "News",},{id: "projects-mha-cnn-for-epileptic-seizure-classification",
          title: 'MHA-CNN for Epileptic Seizure Classification',
          description: "Revolutionary deep learning architecture combining multi-head attention with CNN for automated epileptic seizure classification, achieving 98.4% accuracy on 7 seizure types",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/1_epilepsy_seizure/";
            },},{id: "projects-kneevit-hybrid-architecture-for-knee-mri-classification",
          title: 'KneeViT - Hybrid Architecture for Knee MRI Classification',
          description: "Advanced hybrid deep learning model combining VGG Transformer and OverLoCK ConvNet for automated knee injury detection from MRI scans with high diagnostic accuracy",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/2_kneevit_mri/";
            },},{id: "projects-hybrid-esn-lstm-for-kse-100-stock-forecasting",
          title: 'Hybrid ESN-LSTM for KSE-100 Stock Forecasting',
          description: "Innovative financial modeling system combining Echo State Networks with LSTM for superior stock market prediction, achieving 94.12% directional accuracy on KSE-100 index",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/3_hybrid_esn_lstm/";
            },},{id: "projects-timegpt-for-influenza-surveillance",
          title: 'TimeGPT for Influenza Surveillance',
          description: "Cutting-edge time series forecasting system using TimeGPT for epidemiological surveillance, achieving superior performance over traditional models in disease outbreak prediction",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/4_timegpt_influenza/";
            },},{id: "projects-iot-smart-power-theft-detection-system",
          title: 'IoT Smart Power Theft Detection System',
          description: "Comprehensive IoT solution for real-time electricity theft detection using Raspberry Pi and cloud monitoring, addressing billions in annual losses",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/5_iot_power_theft/";
            },},{id: "projects-indigenous-eeg-acquisition-system",
          title: 'Indigenous EEG Acquisition System',
          description: "Custom-built low-cost EEG data acquisition system designed for research applications, featuring 150x signal amplification and 12-bit ADC for high-quality neural signal recording",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/6_eeg_acquisition/";
            },},{id: "projects-early-mesothelioma-detection-using-ml",
          title: 'Early Mesothelioma Detection Using ML',
          description: "Machine learning system for early cancer detection achieving 100% accuracy using multiple algorithms including Gradient Boosted Trees, SVM, and Logistic Regression",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/7_mesothelioma_ml/";
            },},{id: "projects-sfts-seasonal-pattern-analysis",
          title: 'SFTS Seasonal Pattern Analysis',
          description: "Advanced epidemiological analysis using Complex EMD and harmonic regression to identify multi-scale disease transmission cycles in South Korean SFTS data",
          section: "Projects",handler: () => {
              window.location.href = "/tsgill/projects/8_sfts_seasonal/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%61%69%6D%75%75%72.%73%68%61%68%7A%61%64@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/taymuur", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/taimur-shahzad-gill", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-2467-1688", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Taimur_Gill/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Q3eFoOMAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
