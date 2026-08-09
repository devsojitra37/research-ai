"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { sampleAnalysisData } from "@/lib/ai-service";
import { exportSlidesAsJSON } from "@/lib/export-utils";
import {
  Presentation,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCode,
  Layout,
  Palette,
  CheckCircle2,
  ListOrdered,
  Volume2,
} from "lucide-react";

export default function PresentationsPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "4:3">("16:9");
  const [themeStyle, setThemeStyle] = useState<"academic" | "minimal" | "dark" | "vibrant">("dark");
  const [showNotes, setShowNotes] = useState(true);

  const slides = sampleAnalysisData.presentationSlides;
  const currentSlide = slides[currentSlideIndex];

  const handleDownloadPPTX = () => {
    toast.success("Downloading presentation slide deck as PPTX file...");
  };

  const handleExportJSON = () => {
    exportSlidesAsJSON(slides, "HeartNet_Presentation.json");
    toast.success("Exported slide deck metadata!");
  };

  const themeClasses = {
    academic: "bg-slate-900 text-slate-100 border-slate-700",
    minimal: "bg-white text-slate-900 border-slate-200 shadow-xl",
    dark: "bg-slate-950 text-white border-primary/30 shadow-2xl",
    vibrant: "bg-gradient-to-br from-blue-950 via-slate-900 to-violet-950 text-white border-violet-500/30",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Presentation Generator</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Automatically transform your research paper into a professional 14-slide academic presentation deck.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <Button variant="outline" size="sm" onClick={handleExportJSON} className="text-xs gap-1">
            <FileCode className="w-4 h-4" /> Export JSON
          </Button>
          <Button variant="gradient" size="sm" onClick={handleDownloadPPTX} className="text-xs gap-1.5">
            <Download className="w-4 h-4" /> Download PPTX / PDF
          </Button>
        </div>
      </div>

      {/* Control Bar: Aspect Ratio & Theme Selector */}
      <Card className="border-border bg-card">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Aspect Ratio */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground">Screen Ratio:</span>
            <div className="flex items-center p-1 rounded-lg bg-muted border border-border">
              <button
                onClick={() => setAspectRatio("16:9")}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  aspectRatio === "16:9" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                16:9 Widescreen
              </button>
              <button
                onClick={() => setAspectRatio("4:3")}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  aspectRatio === "4:3" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                4:3 Standard
              </button>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground">Theme Style:</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: "dark", name: "Dark AI" },
                { id: "academic", name: "Academic" },
                { id: "minimal", name: "Minimalist" },
                { id: "vibrant", name: "Vibrant" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeStyle(t.id as any)}
                  className={`px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                    themeStyle === t.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Live Slide Preview Canvas */}
      <div className="space-y-4">
        <div
          className={`w-full rounded-2xl border transition-all duration-300 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden ${
            themeClasses[themeStyle]
          } ${aspectRatio === "16:9" ? "aspect-video" : "aspect-[4/3]"}`}
        >
          {/* Header watermark */}
          <div className="flex items-center justify-between text-xs opacity-60">
            <span className="font-bold tracking-wider uppercase">ResearchAI Presentation Deck</span>
            <span>Slide {currentSlide.slideNumber} of {slides.length}</span>
          </div>

          {/* Slide Title & Bullets */}
          <div className="my-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {currentSlide.title}
            </h2>

            <ul className="space-y-3">
              {currentSlide.bulletPoints.map((bp, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed opacity-90">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between text-xs opacity-50 border-t border-current/20 pt-3">
            <span>HeartNet-Transformer ECG Paper</span>
            <span>Confidential & Academic Use</span>
          </div>
        </div>

        {/* Slide Controls & Thumbnails */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              className="gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <span className="text-xs font-semibold text-muted-foreground px-2">
              Slide {currentSlideIndex + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentSlideIndex === slides.length - 1}
              onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              className="gap-1 text-xs"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className="text-xs gap-1.5"
          >
            <Volume2 className="w-4 h-4" /> {showNotes ? "Hide Speaker Notes" : "Show Speaker Notes"}
          </Button>
        </div>
      </div>

      {/* Speaker Notes Box */}
      {showNotes && (
        <Card className="border-primary/20 bg-card">
          <CardHeader className="py-3">
            <CardTitle className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Presenter & Speaker Script Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "{currentSlide.speakerNotes}"
            </p>
          </CardContent>
        </Card>
      )}

      {/* Slide Navigator Ribbon */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`flex-shrink-0 w-32 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              currentSlideIndex === idx
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border bg-card hover:bg-accent"
            }`}
          >
            <span className="text-[10px] font-bold text-primary block">Slide {s.slideNumber}</span>
            <p className="text-xs font-semibold truncate mt-0.5">{s.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
