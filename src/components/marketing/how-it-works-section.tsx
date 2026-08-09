"use client";

import { Upload, Brain, Lightbulb, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Upload,
    title: "Upload Research",
    description: "Drag and drop your PDF, DOCX, TXT, or PPTX research document into our secure uploader.",
    color: "from-blue-500 to-blue-600",
    glowColor: "shadow-blue-500/20",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Analyzes Document",
    description: "Our AI extracts text, identifies structure, analyzes content, and processes your document in minutes.",
    color: "from-violet-500 to-violet-600",
    glowColor: "shadow-violet-500/20",
  },
  {
    step: 3,
    icon: Lightbulb,
    title: "Generate Insights",
    description: "Get summaries, quality scores, citations, charts, infographics, and presentations — all AI-generated.",
    color: "from-pink-500 to-pink-600",
    glowColor: "shadow-pink-500/20",
  },
  {
    step: 4,
    icon: Download,
    title: "Download & Share",
    description: "Export results as PDF, DOCX, PPTX, or PNG. Share your research with a single link.",
    color: "from-emerald-500 to-emerald-600",
    glowColor: "shadow-emerald-500/20",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30 relative" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            From Upload to{" "}
            <span className="gradient-text">Impact in Minutes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to transform your research into actionable insights.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500/30 via-violet-500/30 via-pink-500/30 to-emerald-500/30" />

          {steps.map((item, idx) => (
            <div key={item.step} className="relative text-center group">
              {/* Step Number Circle */}
              <div className="relative mx-auto mb-6">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.glowColor} group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <span className="text-xs font-bold">{item.step}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Arrow (between steps on mobile) */}
              {idx < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
