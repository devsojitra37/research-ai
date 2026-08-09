"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleAnalysisData } from "@/lib/ai-service";
import { exportAnalysisReportAsMarkdown } from "@/lib/export-utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Brain,
  FileText,
  Upload,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  Target,
  FlaskConical,
  BarChart3,
  Quote,
  MessageSquare,
  Presentation,
  Sliders,
  TrendingUp,
  HelpCircle,
  Copy,
} from "lucide-react";

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "quality" | "methodology" | "findings">("summary");
  const data = sampleAnalysisData;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(data.detailedSummary);
    toast.success("Detailed summary copied to clipboard!");
  };

  const handleExport = () => {
    exportAnalysisReportAsMarkdown(data, "HeartNet_Arrhythmia_Detection_2026.pdf");
    toast.success("Analysis report downloaded!");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Title Bar & Document Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="gradient" className="text-xs">
              AI Analysis Complete
            </Badge>
            <Badge variant="outline" className="text-xs">
              PDF • 4.2 MB
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">
            HeartNet-Transformer: Early Cardiac Arrhythmia Detection from Multi-Lead ECGs
          </h1>
          <p className="text-muted-foreground text-xs">
            Uploaded today • Evaluated on 109,446 MIT-BIH ECG samples
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Link href={`/research/heartnet-arrhythmia-2026`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="w-4 h-4" /> Share Page
            </Button>
          </Link>
          <Link href="/dashboard/simple-language">
            <Button variant="gradient" size="sm" className="gap-1.5">
              <MessageSquare className="w-4 h-4" /> Explain Simply
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/5 to-violet-500/5 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Research Quality</p>
                <p className="text-3xl font-extrabold text-primary mt-1">{data.qualityScore.overall}<span className="text-lg text-muted-foreground font-normal">/100</span></p>
                <p className="text-xs text-emerald-400 font-medium mt-1">Excellent Methodology</p>
              </div>
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Diagnostic Accuracy</p>
                <p className="text-3xl font-extrabold mt-1">98.4%</p>
                <p className="text-xs text-emerald-400 font-medium mt-1">+4.2% over ResNet</p>
              </div>
              <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Inference Latency</p>
                <p className="text-3xl font-extrabold mt-1">12<span className="text-sm font-normal text-muted-foreground"> ms</span></p>
                <p className="text-xs text-blue-400 font-medium mt-1">Edge Hardware Ready</p>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <Sliders className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Similarity Score</p>
                <p className="text-3xl font-extrabold mt-1">12<span className="text-sm font-normal text-muted-foreground">%</span></p>
                <p className="text-xs text-emerald-400 font-medium mt-1">Low Similarity / Original</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        <Button
          variant={activeTab === "summary" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("summary")}
          className="gap-2 text-xs"
        >
          <FileText className="w-4 h-4" /> Summaries & Objectives
        </Button>
        <Button
          variant={activeTab === "quality" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("quality")}
          className="gap-2 text-xs"
        >
          <Award className="w-4 h-4" /> Research Quality Breakdown
        </Button>
        <Button
          variant={activeTab === "methodology" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("methodology")}
          className="gap-2 text-xs"
        >
          <FlaskConical className="w-4 h-4" /> Methodology & Results
        </Button>
        <Button
          variant={activeTab === "findings" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("findings")}
          className="gap-2 text-xs"
        >
          <Sparkles className="w-4 h-4" /> Key Findings & Keywords
        </Button>
      </div>

      {/* TAB 1: SUMMARIES */}
      {activeTab === "summary" && (
        <div className="space-y-6 animate-fade-in">
          {/* Executive Summary */}
          <Card className="border-primary/30 bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Brain className="w-5 h-5" /> Executive Summary
              </CardTitle>
              <Badge variant="secondary" className="text-xs">Business & Research View</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                {data.executiveSummary}
              </p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Short Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4.5 h-4.5 text-blue-400" /> Short Summary (100–150 words)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.shortSummary}
                </p>
              </CardContent>
            </Card>

            {/* Research Objective */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4.5 h-4.5 text-violet-400" /> Core Research Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.researchObjective}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-emerald-400" /> Detailed Academic Summary
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCopySummary} className="text-xs gap-1">
                <Copy className="w-3.5 h-3.5" /> Copy Text
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {data.detailedSummary}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: RESEARCH QUALITY BREAKDOWN */}
      {activeTab === "quality" && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Research Quality Score Breakdown (0–100)
              </CardTitle>
              <CardDescription>
                AI-evaluated score derived from 11 academic dimensions including literature rigor, methodology clarity, and reference validity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Sliders / Progress bars */}
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(data.qualityScore.breakdown).map(([key, val]) => {
                  const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div key={key} className="space-y-1.5 p-3 rounded-xl bg-muted/20">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">{formattedKey}</span>
                        <span className="font-bold">{val}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Major Strengths
                  </h4>
                  <ul className="space-y-2">
                    {data.qualityScore.strengths.map((str, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2 bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20">
                        <span className="text-emerald-400 font-bold">•</span>
                        {str}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" /> Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {data.qualityScore.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2 bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/20">
                        <span className="text-amber-400 font-bold">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: METHODOLOGY & RESULTS */}
      {activeTab === "methodology" && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-violet-400" /> Methodology Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.methodology}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" /> Major Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.results}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Conclusion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.conclusion}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: KEY FINDINGS & KEYWORDS */}
      {activeTab === "findings" && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Key Research Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {data.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm font-medium">{finding}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Keywords & Indexing Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((word) => (
                  <Badge key={word} variant="secondary" className="px-3 py-1 text-xs">
                    #{word}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Action Footer Strip */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border">
        <Link href="/dashboard/simple-language">
          <Button variant="outline" className="w-full justify-start text-xs h-11">
            <MessageSquare className="w-4 h-4 mr-2 text-primary" /> Explain Simply
          </Button>
        </Link>
        <Link href="/dashboard/citations">
          <Button variant="outline" className="w-full justify-start text-xs h-11">
            <Quote className="w-4 h-4 mr-2 text-violet-400" /> Citation Assistant
          </Button>
        </Link>
        <Link href="/dashboard/charts">
          <Button variant="outline" className="w-full justify-start text-xs h-11">
            <BarChart3 className="w-4 h-4 mr-2 text-pink-400" /> Generate Charts
          </Button>
        </Link>
        <Link href="/dashboard/presentations">
          <Button variant="gradient" className="w-full justify-start text-xs h-11">
            <Presentation className="w-4 h-4 mr-2" /> Presentation Generator
          </Button>
        </Link>
      </div>
    </div>
  );
}
