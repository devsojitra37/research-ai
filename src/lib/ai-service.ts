// ===========================================
// ResearchAI — AI Service & Processing Pipeline
// ===========================================

export interface DocumentAnalysisResult {
  shortSummary: string;
  detailedSummary: string;
  executiveSummary: string;
  keyFindings: string[];
  researchObjective: string;
  methodology: string;
  results: string;
  conclusion: string;
  keywords: string[];
  qualityScore: {
    overall: number;
    breakdown: {
      problemDefinition: number;
      literatureReview: number;
      methodology: number;
      dataAnalysis: number;
      results: number;
      discussion: number;
      conclusion: number;
      references: number;
      writingQuality: number;
      structure: number;
      visualPresentation: number;
    };
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  citations: Array<{
    id: string;
    claim: string;
    suggestedSource: string;
    reason: string;
    citation: string;
    confidence: number;
    verified: boolean;
    format: string;
  }>;
  similarityReport: {
    overallScore: number;
    matchedCount: number;
    matchedSections: Array<{
      section: string;
      text: string;
      source: string;
      similarity: number;
      url?: string;
    }>;
    disclaimer: string;
  };
  simpleLanguage: {
    beginner: string;
    highSchool: string;
    college: string;
    nonTechnical: string;
    analogy: string;
    keyTakeaway: string;
  };
  chartSuggestions: Array<{
    type: "bar" | "line" | "pie" | "scatter" | "histogram";
    title: string;
    description: string;
    xAxisLabel: string;
    yAxisLabel: string;
    data: Array<Record<string, string | number>>;
  }>;
  presentationSlides: Array<{
    slideNumber: number;
    title: string;
    type: "title" | "intro" | "problem" | "objectives" | "literature" | "methodology" | "results" | "chart" | "conclusion" | "future" | "references";
    bulletPoints: string[];
    speakerNotes: string;
  }>;
}

// Sample High-Quality Mock Analysis Data for instant interactive demos
export const sampleAnalysisData: DocumentAnalysisResult = {
  shortSummary:
    "This study presents a novel deep-learning approach utilizing Convolutional Neural Networks (CNNs) and transformer architectures for early-stage cardiac arrhythmia detection from multi-lead Electrocardiograms (ECGs). The proposed hybrid pipeline achieves 98.4% accuracy, outperforming existing benchmark models by 4.2%.",
  detailedSummary:
    "Cardiovascular diseases remain the leading cause of global mortality. Early detection of cardiac arrhythmia through non-invasive Electrocardiogram (ECG) monitoring is critical for prompt clinical intervention. Standard automated ECG diagnosis often suffers from high false-positive rates due to motion artifacts and baseline wander. In this paper, we propose HeartNet-Transformer, an end-to-end multi-scale feature fusion neural network that combines residual 1D CNNs with self-attention mechanism transformers. Evaluated on the MIT-BIH Arrhythmia Database comprising 109,446 ECG heartbeats, our algorithm demonstrates state-of-the-art diagnostic accuracy of 98.4%, sensitivity of 97.9%, and specificity of 98.8%. Furthermore, the lightweight architecture allows real-time inference on edge devices, paving the way for wearable cardiac monitors.",
  executiveSummary:
    "HeartNet-Transformer solves a critical healthcare challenge: reliable, real-time early detection of cardiac arrhythmia on low-resource wearable medical devices. By combining multi-lead signal processing with self-attention transformer layers, the model achieves a clinical accuracy rate of 98.4% while reducing false alarms by 38%. This technology enables proactive cardiac monitoring for at-risk patients and provides emergency predictive alerts to healthcare providers.",
  keyFindings: [
    "Achieved 98.4% classification accuracy across 5 major arrhythmia types on the MIT-BIH dataset.",
    "Integrated self-attention transformers to capture long-range temporal dependencies in ECG signals.",
    "Reduced inference latency to 12ms per 10-second ECG window, enabling edge hardware execution.",
    "Decreased clinical false-positive rates by 38% compared to traditional SVM and ResNet baselines.",
    "Demonstrated robust generalization across diverse patient demographics and signal noise levels."
  ],
  researchObjective:
    "To design, implement, and validate a highly accurate, computationally efficient deep-learning model for automated multi-lead ECG arrhythmia classification suitable for real-time edge deployment.",
  methodology:
    "The methodology comprises three stages: (1) Signal preprocessing involving Butterworth bandpass filtering and wavelet denoising to eliminate powerline interference and baseline wander; (2) Feature extraction using 1D-ResNet blocks coupled with multi-head self-attention transformer layers to capture both local waveform features and global rhythmic patterns; (3) Multi-class classification evaluated under patient-specific 5-fold cross-validation.",
  results:
    "Evaluating the model on 109,446 annotated heartbeat samples achieved an overall Accuracy of 98.4%, Precision of 98.1%, Recall/Sensitivity of 97.9%, and an F1-Score of 98.0%. Model inference time was 12ms with a memory footprint of 4.2 MB.",
  conclusion:
    "HeartNet-Transformer provides a clinically reliable, computationally lightweight solution for automated ECG analysis. Its superior accuracy and ultra-low latency make it ideal for integration into smartwatches, telemetry devices, and hospital intensive care monitoring units.",
  keywords: [
    "Arrhythmia Detection",
    "Deep Learning",
    "Transformer Architecture",
    "1D CNN",
    "Electrocardiogram (ECG)",
    "Signal Processing",
    "Wearable Healthcare",
    "Edge AI"
  ],
  qualityScore: {
    overall: 88,
    breakdown: {
      problemDefinition: 92,
      literatureReview: 85,
      methodology: 90,
      dataAnalysis: 94,
      results: 92,
      discussion: 86,
      conclusion: 88,
      references: 84,
      writingQuality: 90,
      structure: 89,
      visualPresentation: 86
    },
    strengths: [
      "Rigorous experimental validation on a standard benchmark dataset (MIT-BIH).",
      "Clear explanation of technical architecture and hyperparameter choices.",
      "Comprehensive performance metrics (Accuracy, Sensitivity, Specificity, F1-Score).",
      "Practical emphasis on low-latency edge device feasibility."
    ],
    weaknesses: [
      "Literature review lacks comparison with the most recent 2025 Vision Transformer papers.",
      "Dataset relies heavily on single-institution data; external clinical cohort validation is needed."
    ],
    recommendations: [
      "Include external dataset evaluation (e.g., PhysioNet Challenge dataset) to prove cross-cohort generalization.",
      "Add a discussion section addressing potential hardware memory constraints on wearable microcontrollers."
    ]
  },
  citations: [
    {
      id: "cit-1",
      claim: "Cardiovascular diseases remain the primary cause of global mortality, accounting for 17.9 million deaths annually.",
      suggestedSource: "World Health Organization (WHO) Global Health Estimates 2024",
      reason: "Provides global statistical authority for mortality claims in background.",
      citation: "World Health Organization. (2024). Global Health Estimates: Causes of Death 2000–2024. WHO Press.",
      confidence: 96,
      verified: true,
      format: "APA 7"
    },
    {
      id: "cit-2",
      claim: "Traditional automated ECG classification methods suffer from severe baseline wander artifacts during physical exertion.",
      suggestedSource: "Moody, G. B., & Mark, R. G. (2001). The impact of noise on ECG algorithms.",
      reason: "Establishes historical baseline for ECG noise challenges.",
      citation: "Moody, G. B., & Mark, R. G. (2001). The impact of noise on ECG algorithms. IEEE Engineering in Medicine and Biology Magazine, 20(3), 45-50.",
      confidence: 92,
      verified: true,
      format: "IEEE"
    },
    {
      id: "cit-3",
      claim: "Self-attention transformer layers effectively capture long-range temporal dependencies in continuous bio-signals.",
      suggestedSource: "Vaswani et al. (2017) Attention Is All You Need / Bio-Transformer adaptations",
      reason: "Validates model choice for sequence modeling.",
      citation: "Vaswani, A., et al. (2017). Attention is all you need. Advances in Neural Information Processing Systems (NeurIPS), 30, 5998–6008.",
      confidence: 95,
      verified: true,
      format: "APA 7"
    }
  ],
  similarityReport: {
    overallScore: 12,
    matchedCount: 3,
    matchedSections: [
      {
        section: "Introduction - Background",
        text: "Cardiovascular diseases remain the leading cause of global mortality accounting for an estimated 17.9 million lives each year.",
        source: "IEEE Transactions on Biomedical Engineering (2023)",
        similarity: 18,
        url: "https://ieeexplore.ieee.org/document/984321"
      },
      {
        section: "Methodology - Preprocessing",
        text: "Signals were filtered using a 4th-order Butterworth bandpass filter with cutoff frequencies at 0.5 Hz and 45 Hz.",
        source: "Journal of Medical Systems (2022)",
        similarity: 24,
        url: "https://springer.com/journal/10916"
      },
      {
        section: "Dataset Description",
        text: "The MIT-BIH Arrhythmia Database contains 48 half-hour excerpts of two-channel ambulatory ECG recordings.",
        source: "PhysioNet Database Description",
        similarity: 32,
        url: "https://physionet.org/content/mitdb/"
      }
    ],
    disclaimer:
      "This similarity analysis provides an algorithmic search for phrase matches across academic repositories. It does not constitute a legal determination of plagiarism. Authors are responsible for ensuring appropriate attribution."
  },
  simpleLanguage: {
    beginner:
      "Imagine your heart plays a rhythm like a drum. Sometimes it skips a beat or beats too fast. We built a smart computer program that listens to your heart's drumbeats and instantly spots if something is wrong with 98% accuracy!",
    highSchool:
      "Heart conditions like arrhythmia mean the heart beats irregularly. Doctors use ECG machines to draw heart rhythm waves. Our AI program looks at these wave lines and detects abnormal patterns faster and more accurately than standard machines.",
    college:
      "This project introduces a hybrid neural network combining Convolutional Neural Networks (CNNs) for signal feature extraction and Transformer self-attention modules for temporal pattern modeling. Tested on over 100,000 ECG beats, it diagnoses 5 arrhythmia types with 98.4% accuracy.",
    nonTechnical:
      "We created an AI tool that can be put inside smartwatches to monitor your heart continuous rhythm. It identifies irregular heartbeats in milliseconds and alerts doctors before a serious medical event occurs.",
    analogy:
      "Think of standard ECG analyzers as proofreaders checking one word at a time. Our Transformer AI reads the entire sentence and paragraph of your heart rhythm at once, understanding the full context of every heartbeat.",
    keyTakeaway:
      "AI can now detect dangerous heart arrhythmias with 98.4% precision directly on smartwatch chips, saving lives through early warning."
  },
  chartSuggestions: [
    {
      type: "bar",
      title: "Model Diagnostic Accuracy Comparison (%)",
      description: "Comparing HeartNet-Transformer against traditional benchmark algorithms",
      xAxisLabel: "Algorithm",
      yAxisLabel: "Accuracy (%)",
      data: [
        { name: "SVM Baseline", accuracy: 89.2, f1: 88.5 },
        { name: "1D CNN ResNet", accuracy: 94.2, f1: 93.8 },
        { name: "LSTM-RNN", accuracy: 92.8, f1: 92.1 },
        { name: "HeartNet-Transformer (Ours)", accuracy: 98.4, f1: 98.0 }
      ]
    },
    {
      type: "line",
      title: "Training Loss vs. Epochs",
      description: "Convergence rate across 50 training epochs",
      xAxisLabel: "Epoch",
      yAxisLabel: "Loss",
      data: [
        { epoch: "10", trainLoss: 0.45, valLoss: 0.48 },
        { epoch: "20", trainLoss: 0.22, valLoss: 0.25 },
        { epoch: "30", trainLoss: 0.11, valLoss: 0.14 },
        { epoch: "40", trainLoss: 0.05, valLoss: 0.08 },
        { epoch: "50", trainLoss: 0.02, valLoss: 0.04 }
      ]
    },
    {
      type: "pie",
      title: "MIT-BIH Dataset Arrhythmia Distribution",
      description: "Heartbeat sample count by arrhythmia category",
      xAxisLabel: "Class",
      yAxisLabel: "Samples",
      data: [
        { name: "Normal (N)", value: 75000 },
        { name: "Premature Ventricular (V)", value: 12000 },
        { name: "Supraventricular (S)", value: 8500 },
        { name: "Fusion (F)", value: 4000 },
        { name: "Unknown (Q)", value: 9946 }
      ]
    }
  ],
  presentationSlides: [
    {
      slideNumber: 1,
      title: "HeartNet-Transformer: Early Cardiac Arrhythmia Detection",
      type: "title",
      bulletPoints: [
        "A Deep Learning Approach Using Multi-Scale CNN & Self-Attention",
        "Author: AI Research Team | ResearchAI Platform",
        "Published: 2026 Academic Presentation"
      ],
      speakerNotes: "Welcome everyone. Today we present HeartNet-Transformer for early cardiac arrhythmia detection."
    },
    {
      slideNumber: 2,
      title: "Background & Clinical Problem",
      type: "problem",
      bulletPoints: [
        "Cardiovascular diseases cause 17.9M deaths annually worldwide.",
        "Manual ECG interpretation by cardiologists is time-consuming and prone to human fatigue.",
        "Existing automated systems suffer high false-positive rates due to motion artifacts."
      ],
      speakerNotes: "Highlight the urgency of non-invasive automated ECG diagnostic tools."
    },
    {
      slideNumber: 3,
      title: "Research Objectives",
      type: "objectives",
      bulletPoints: [
        "Develop an end-to-end deep learning framework combining 1D CNNs and Transformers.",
        "Achieve >97% clinical diagnostic accuracy across multi-class arrhythmia categories.",
        "Maintain ultra-low latency (<15ms) for edge wearable hardware deployment."
      ],
      speakerNotes: "Emphasize both diagnostic accuracy and computational efficiency."
    },
    {
      slideNumber: 4,
      title: "System Architecture",
      type: "methodology",
      bulletPoints: [
        "Preprocessing: Wavelet denoising & Butterworth bandpass filtering (0.5-45 Hz).",
        "Feature Extraction: 1D-ResNet blocks capture local signal morphological patterns.",
        "Temporal Modeling: Multi-Head Transformer Self-Attention models heartbeat sequences."
      ],
      speakerNotes: "Walk through the multi-stage neural network architecture."
    },
    {
      slideNumber: 5,
      title: "Experimental Results & Accuracy",
      type: "results",
      bulletPoints: [
        "Evaluated on MIT-BIH Arrhythmia Database (109,446 annotated heartbeats).",
        "Overall Diagnostic Accuracy: 98.4% | Sensitivity: 97.9% | Specificity: 98.8%.",
        "Outperforms benchmark SVM (+9.2%) and standalone 1D-CNN (+4.2%)."
      ],
      speakerNotes: "Focus on key clinical metric improvements."
    },
    {
      slideNumber: 6,
      title: "Performance Comparison (Charts)",
      type: "chart",
      bulletPoints: [
        "Accuracy Comparison across standard baseline algorithms.",
        "Training convergence achieved within 50 epochs.",
        "Inference latency: 12ms per 10-second ECG window."
      ],
      speakerNotes: "Refer to the accuracy bar chart visualization."
    },
    {
      slideNumber: 7,
      title: "Conclusion & Future Scope",
      type: "conclusion",
      bulletPoints: [
        "HeartNet-Transformer provides state-of-the-art accuracy with lightweight computing footprint.",
        "Enables continuous smartwatch arrhythmia monitoring and proactive clinical alerts.",
        "Future Work: Multi-center clinical trials and integration with real-world hospital telemetry."
      ],
      speakerNotes: "Summarize major findings and open questions for future exploration."
    }
  ]
};

// AI Provider Service abstraction class
export class AIService {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.AI_API_KEY;
  }

  public async analyzeDocument(text: string, fileName: string): Promise<DocumentAnalysisResult> {
    // If real API key is supplied, could call OpenAI / Gemini here.
    // For fast, high-fidelity offline execution, return structured result tailored to file name.
    const result = JSON.parse(JSON.stringify(sampleAnalysisData)) as DocumentAnalysisResult;

    if (fileName && fileName.length > 0) {
      result.shortSummary = `Analysis of "${fileName}": ` + result.shortSummary;
    }

    return result;
  }

  public async explainSimply(text: string, level: "beginner" | "highSchool" | "college" | "nonTechnical"): Promise<string> {
    const data = sampleAnalysisData.simpleLanguage;
    return data[level] || data.beginner;
  }

  public async formatCitation(claim: string, style: string): Promise<string> {
    switch (style.toUpperCase()) {
      case "IEEE":
        return `[1] J. Smith, A. Patel, and R. Kumar, "Deep learning for ECG analysis," IEEE Trans. Biomed. Eng., vol. 70, no. 4, pp. 1120–1129, 2025.`;
      case "MLA":
        return `Smith, John, et al. "Deep Learning for ECG Analysis." IEEE Transactions on Biomedical Engineering, vol. 70, no. 4, 2025, pp. 1120-1129.`;
      case "CHICAGO":
        return `Smith, John, Ankit Patel, and Rahul Kumar. "Deep Learning for ECG Analysis." IEEE Transactions on Biomedical Engineering 70, no. 4 (2025): 1120-1129.`;
      case "HARVARD":
        return `Smith, J., Patel, A. and Kumar, R., 2025. Deep learning for ECG analysis. IEEE Transactions on Biomedical Engineering, 70(4), pp.1120-1129.`;
      case "VANCOUVER":
        return `1. Smith J, Patel A, Kumar R. Deep learning for ECG analysis. IEEE Trans Biomed Eng. 2025;70(4):1120-1129.`;
      case "APA 7":
      default:
        return `Smith, J., Patel, A., & Kumar, R. (2025). Deep learning for ECG analysis. IEEE Transactions on Biomedical Engineering, 70(4), 1120–1129. https://doi.org/10.1109/TBME.2025.123456`;
    }
  }

  public async rewriteText(text: string, mode: "academic" | "simplify" | "concise" | "expand"): Promise<string> {
    if (mode === "academic") {
      return `The empirical evaluation demonstrates that the proposed deep architectural framework exhibits statistically significant superiority in diagnostic accuracy relative to legacy baseline models.`;
    }
    if (mode === "simplify") {
      return `Our tests show that this new computer model works much better and makes fewer mistakes than older models.`;
    }
    if (mode === "concise") {
      return `The model significantly outperforms standard baselines in diagnostic accuracy.`;
    }
    return `In our extensive empirical evaluation involving over 100,000 annotated heartbeat samples across multi-institutional datasets, the proposed deep learning architecture consistently demonstrated statistically significant improvements in diagnostic precision, sensitivity, and operational latency when compared to traditional algorithms.`;
  }
}

export const aiService = new AIService();
