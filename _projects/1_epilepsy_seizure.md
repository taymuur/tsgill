---
layout: page
title: MHA-CNN for Epileptic Seizure Classification
description: Revolutionary deep learning architecture combining multi-head attention with CNN for automated epileptic seizure classification, achieving 98.4% accuracy on 7 seizure types
importance: 1
category: research
related_publications: true
---

Developed a novel attention-based deep convolutional neural network that revolutionizes automated epileptic seizure classification. The system processes EEG signals from the Temple University Hospital Seizure Corpus, extracting 11 sophisticated features including time-based correlation, eigenvalues, power spectral density, and wavelet coefficients.

### Key Achievements

- **98.4% testing accuracy** on multiclass seizure classification
- **Outperformed traditional CNN by 15.4%** (CNN alone achieved 76.7% accuracy)
- Successfully classified **7 different seizure types** with high precision
- **Published in Epilepsy & Behavior**, a Q1 journal in neuroscience
- Demonstrated potential for real-world clinical deployment

### Technical Approach

The multi-head attention mechanism enables the model to focus on the most discriminative patterns across different seizure types. The architecture combines:

- **Feature Extraction** - 11 sophisticated features from EEG signals
- **Multi-Head Attention** - Captures diverse seizure patterns
- **Deep CNN** - Processes spatial-temporal relationships
- **Transformer Encoders** - Layer normalization for stability

### Performance Metrics

| Metric | Value |
|--------|-------|
| Training Accuracy | 99.1% |
| Testing Accuracy | 98.4% |
| Weighted F1 Score | 90.2% |
| Seizure Types | 7 classes |
| Dataset | TUSZ v1.5.2 |

<br>

### Technologies Used

Python, TensorFlow, Keras, NumPy, MNE, PyEDF, Matplotlib, EEG Processing, Deep Learning, Attention Mechanisms

### Impact

This breakthrough in automated epilepsy diagnosis has potential to assist neurologists worldwide in faster and more accurate seizure classification, ultimately improving patient care and treatment outcomes.

### Timeline

February 2022 - November 2022

### Collaborators

- Muhammad Ayaz Shirazi
- Syed Sajjad Haider Zaidi