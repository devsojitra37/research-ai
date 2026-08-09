"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { sampleAnalysisData } from "@/lib/ai-service";
import {
  MessageSquare,
  Sparkles,
  ArrowRightLeft,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  Copy,
  Wand2,
  Zap,
  GraduationCap,
  Baby,
  Building,
  School,
} from "lucide-react";

export default function SimpleLanguagePage() {
  const [readingLevel, setReadingLevel] = useState<"beginner" | "highSchool" | "college" | "nonTechnical">("beginner");
  const [viewMode, setViewMode] = useState<"split" | "simpleOnly">("split");
  const [customText, setCustomText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [customSimpleOutput, setCustomSimpleOutput] = useState<string | null>(null);

  const sampleSimple = sampleAnalysisData.simpleLanguage;

  const handleTranslateCustom = () => {
    if (!customText.trim()) {
      toast.error("Please enter technical research text to simplify!");
      return;
    }
    setTranslating(true);
    setTimeout(() => {
      setCustomSimpleOutput(
        `Simplified (${readingLevel}): "${customText.slice(0, 100)}..." is simplified to: The study shows that using smart learning algorithms helps computers recognize pattern sequences much faster, reducing mistakes by almost half!`
      );
      setTranslating(false);
      toast.success("Text simplified!");
    }, 600);
  };

  const levelConfigs = [
    { id: "beginner", label: "Beginner / 5th Grade", icon: Baby, color: "text-emerald-400" },
    { id: "highSchool", label: "High School Student", icon: School, color: "text-blue-400" },
    { id: "college", label: "Undergraduate Student", icon: GraduationCap, color: "text-violet-400" },
    { id: "nonTechnical", label: "Non-Technical Executive", icon: Building, color: "text-amber-400" },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gradient" className="text-xs">Signature Feature</Badge>
            <Badge variant="outline" className="text-xs">AI Simplifier</Badge>
          </div>
          <h1 className="text-2xl font-bold mt-1">Explain in Simple Language</h1>
          <p className="text-muted-foreground text-sm">
            Transform dense academic papers and technical jargon into crystal-clear explanations everyone can understand.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-muted border border-border self-start">
          <button
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === "split" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Technical ↔ Simple Split
          </button>
          <button
            onClick={() => setViewMode("simpleOnly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === "simpleOnly" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Simple View
          </button>
        </div>
      </div>

      {/* Reading Level Selector Pills */}
      <Card className="border-primary/20 bg-card">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Select Target Reading Level:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {levelConfigs.map((lvl) => {
              const Icon = lvl.icon;
              const isSelected = readingLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setReadingLevel(lvl.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${lvl.color}`} />
                  <span>{lvl.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Showcase Grid */}
      <div className={`grid gap-6 ${viewMode === "split" ? "md:grid-cols-2" : "grid-cols-1"}`}>
        {/* Technical Text Column */}
        {viewMode === "split" && (
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4.5 h-4.5 text-muted-foreground" /> Technical Research Text
                </span>
                <Badge variant="outline" className="text-[10px]">Academic Peer-Reviewed</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-muted/40 font-mono text-xs leading-relaxed text-muted-foreground border border-border/50 min-h-[160px]">
                "Convolutional neural networks utilize multi-scale 1D residual spatial convolutions combined with multi-head self-attention mechanisms to map temporal ECG voltage fluctuations onto a high-dimensional latent feature vector for multi-class arrhythmia classification."
              </div>
            </CardContent>
          </Card>
        )}

        {/* Simple Explanation Column */}
        <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-violet-500/5 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2 text-primary">
                <Sparkles className="w-4.5 h-4.5" /> Simple Explanation ({readingLevel})
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(sampleSimple[readingLevel]);
                  toast.success("Explanation copied!");
                }}
                className="text-xs gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-card border border-primary/20 text-sm leading-relaxed text-foreground min-h-[160px] font-medium shadow-sm">
              {sampleSimple[readingLevel]}
            </div>

            {/* Real World Analogy */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Lightbulb className="w-4 h-4" /> Real-World Analogy
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {sampleSimple.analogy}
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Key Takeaway
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {sampleSimple.keyTakeaway}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Simplifier Box */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-violet-400" /> Paste Any Research Section to Simplify
          </CardTitle>
          <CardDescription>
            Have a difficult paragraph from a paper? Paste it below and let AI transform it instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            rows={4}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Paste academic text, methodology, abstract, or complex paper snippet here..."
            className="w-full p-4 rounded-xl bg-muted/30 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
          />

          <div className="flex justify-end">
            <Button variant="gradient" onClick={handleTranslateCustom} disabled={translating}>
              {translating ? (
                <>Simplifying...</>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-1" /> Simplify Now
                </>
              )}
            </Button>
          </div>

          {customSimpleOutput && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm leading-relaxed animate-fade-in">
              <Badge variant="gradient" className="mb-2 text-[10px]">AI Output</Badge>
              <p>{customSimpleOutput}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
