"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Microscope,
  BookOpen,
  Building2,
  School,
  CheckCircle2,
} from "lucide-react";

const useCases = [
  {
    id: "students",
    icon: GraduationCap,
    title: "Students",
    subtitle: "B.Tech, BCA, MCA, Engineering, Medical, Management",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    benefits: [
      "Summarize long research papers in seconds",
      "Explain complex concepts in simple language",
      "Generate professional presentations for viva",
      "Auto-format citations and references",
      "Create charts from project data",
      "Get research quality feedback before submission",
    ],
  },
  {
    id: "researchers",
    icon: Microscope,
    title: "Researchers",
    subtitle: "PhD students, Research Assistants, Independent Researchers",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    benefits: [
      "Analyze literature reviews efficiently",
      "Check similarity before journal submission",
      "Generate structured research insights",
      "Create infographics for publications",
      "Manage multiple research projects",
      "Export publication-ready summaries",
    ],
  },
  {
    id: "professors",
    icon: BookOpen,
    title: "Professors",
    subtitle: "Academic faculty and course instructors",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    benefits: [
      "Quickly review student submissions",
      "Assess research quality at scale",
      "Create lecture materials from research",
      "Generate simplified explanations for teaching",
      "Check student work for similarity",
      "Standardize citation formats",
    ],
  },
  {
    id: "colleges",
    icon: Building2,
    title: "Colleges",
    subtitle: "Departments and research centers",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    benefits: [
      "Institution-wide research tool access",
      "Admin dashboard for usage monitoring",
      "Bulk document processing capabilities",
      "Shared research workspace",
      "Custom branding options",
      "Dedicated support channel",
    ],
  },
  {
    id: "universities",
    icon: School,
    title: "Universities",
    subtitle: "Multi-department research organizations",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    benefits: [
      "Enterprise-grade research platform",
      "Cross-department collaboration",
      "Advanced analytics and reporting",
      "API access for integration",
      "Priority processing queue",
      "Volume pricing with custom plans",
    ],
  },
];

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState("students");
  const activeCase = useCases.find((uc) => uc.id === activeTab)!;

  return (
    <section className="py-24 relative" id="use-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            Use Cases
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built for{" "}
            <span className="gradient-text">Every Academic</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you&apos;re a student, researcher, or institution — ResearchAI adapts to your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActiveTab(uc.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === uc.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <uc.icon className="w-4 h-4" />
              {uc.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <Card className="max-w-4xl mx-auto animate-fade-in" key={activeTab}>
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${activeCase.bgColor}`}>
                <activeCase.icon className={`w-7 h-7 ${activeCase.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{activeCase.title}</h3>
                <p className="text-sm text-muted-foreground">{activeCase.subtitle}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {activeCase.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${activeCase.color}`} />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
