"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  MessageSquare,
  Quote,
  Search,
  BarChart3,
  Image,
  Presentation,
  Award,
  PenTool,
  Lightbulb,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Research Summary",
    description: "Get instant short, detailed, and executive summaries of your research papers with key findings extraction.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: MessageSquare,
    title: "Simple Language Mode",
    description: "Transform complex academic jargon into easy-to-understand explanations for any audience level.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "hover:border-violet-500/30",
  },
  {
    icon: Quote,
    title: "Citation Assistant",
    description: "AI identifies claims needing citations and suggests sources in APA, MLA, IEEE, and more formats.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    icon: Search,
    title: "Similarity Checker",
    description: "Analyze your document for potential similarity issues with highlighted sections and confidence scores.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "hover:border-amber-500/30",
  },
  {
    icon: BarChart3,
    title: "Chart Generator",
    description: "Automatically detect data in your research and generate professional charts — bar, line, pie, scatter, and more.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "hover:border-pink-500/30",
  },
  {
    icon: Image,
    title: "Infographic Generator",
    description: "Create beautiful research infographics with templates for overviews, timelines, process flows, and findings.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    icon: Presentation,
    title: "Presentation Generator",
    description: "Convert your research into professional slide decks with multiple templates. Download as PPTX or PDF.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "hover:border-orange-500/30",
  },
  {
    icon: Award,
    title: "Research Quality Score",
    description: "Get a 0–100 quality score across 11 categories with strengths, weaknesses, and improvement suggestions.",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "hover:border-rose-500/30",
  },
  {
    icon: PenTool,
    title: "AI Writing Assistant",
    description: "Improve grammar, make text more academic, simplify language, expand ideas, or generate entire sections.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "hover:border-indigo-500/30",
  },
  {
    icon: Lightbulb,
    title: "Research Insights",
    description: "Discover research objectives, methodology analysis, key results, and structured conclusions automatically.",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    borderColor: "hover:border-teal-500/30",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative" id="features">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Powerful Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Transform Research</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From AI summaries to professional presentations — one platform for all your academic research needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 stagger-children">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`group cursor-default hover:shadow-lg transition-all duration-300 ${feature.borderColor} hover:-translate-y-1`}
            >
              <CardContent className="p-5">
                <div className={`p-2.5 rounded-xl ${feature.bgColor} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2 text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
