"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleAnalysisData } from "@/lib/ai-service";
import {
  Brain,
  Award,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Globe,
  User,
} from "lucide-react";

export default function PublicResearchPage() {
  const data = sampleAnalysisData;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Public Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg">
              Research<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="gradient" size="sm">
                Analyze Your Own Research
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Showcase */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Title Card */}
        <Card className="border-primary/30 bg-card shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-xs">Public Academic Release</Badge>
              <Badge variant="outline" className="text-xs">Verified by ResearchAI</Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
              HeartNet-Transformer: Early Cardiac Arrhythmia Detection from Multi-Lead ECGs
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <User className="w-4 h-4 text-primary" />
                <Link href="/u/rahul-sharma" className="hover:underline text-primary font-semibold">
                  Rahul Sharma (IIT Bombay)
                </Link>
              </div>
              <span>• Published: Aug 2026</span>
              <span>• Quality Score: <strong className="text-emerald-400 font-bold">{data.qualityScore.overall}/100</strong></span>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Brain className="w-5 h-5" /> Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed font-medium">{data.executiveSummary}</p>
          </CardContent>
        </Card>

        {/* Key Findings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Key Research Findings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {data.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs p-3 rounded-lg bg-muted/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Simple Explanation Box */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-violet-500/5">
          <CardHeader>
            <CardTitle className="text-base text-primary flex items-center gap-2">
              <Globe className="w-4.5 h-4.5" /> Explain in Simple Language (Beginner View)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-foreground leading-relaxed italic p-4 rounded-xl bg-card border border-primary/20">
              "{data.simpleLanguage.beginner}"
            </p>
          </CardContent>
        </Card>

        {/* CTA Footer */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-xl font-bold">Have a research paper or project report?</h2>
          <p className="text-xs opacity-90 max-w-md mx-auto">
            Upload your document to ResearchAI to automatically generate summaries, simple explanations, quality scores, and presentation slide decks in minutes.
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg" className="font-semibold text-xs shadow-md">
              Start Free — Analyze My Research <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
