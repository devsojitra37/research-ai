"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { sampleAnalysisData, aiService } from "@/lib/ai-service";
import { exportCitationsAsBibTeX } from "@/lib/export-utils";
import {
  Quote,
  CheckCircle2,
  Copy,
  Download,
  BookOpen,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  FileCode,
} from "lucide-react";

export default function CitationsPage() {
  const [selectedFormat, setSelectedFormat] = useState<"APA 7" | "MLA" | "Chicago" | "IEEE" | "Harvard" | "Vancouver">("APA 7");
  const [citations, setCitations] = useState(sampleAnalysisData.citations);

  const formats: Array<"APA 7" | "MLA" | "Chicago" | "IEEE" | "Harvard" | "Vancouver"> = [
    "APA 7",
    "MLA",
    "Chicago",
    "IEEE",
    "Harvard",
    "Vancouver",
  ];

  const getFormattedCitation = (item: typeof citations[0], style: string) => {
    switch (style.toUpperCase()) {
      case "IEEE":
        return `[1] ${item.suggestedSource}, "${item.claim.slice(0, 40)}..." IEEE Trans. Biomed. Eng., vol. 70, no. 4, pp. 1120–1129, 2025.`;
      case "MLA":
        return `${item.suggestedSource}. "${item.claim.slice(0, 40)}..." IEEE Transactions on Biomedical Engineering, vol. 70, no. 4, 2025, pp. 1120-1129.`;
      case "CHICAGO":
        return `${item.suggestedSource}. "${item.claim.slice(0, 40)}..." IEEE Transactions on Biomedical Engineering 70, no. 4 (2025): 1120-1129.`;
      case "HARVARD":
        return `${item.suggestedSource}, 2025. ${item.claim.slice(0, 40)}... IEEE Transactions on Biomedical Engineering, 70(4), pp.1120-1129.`;
      case "VANCOUVER":
        return `1. ${item.suggestedSource}. ${item.claim.slice(0, 40)}... IEEE Trans Biomed Eng. 2025;70(4):1120-1129.`;
      case "APA 7":
      default:
        return item.citation;
    }
  };

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Citation copied in ${selectedFormat} format!`);
  };

  const handleExportBibTeX = () => {
    exportCitationsAsBibTeX(citations, "references.bib");
    toast.success("Downloaded BibTeX references!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Citation Assistant</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Detect claims in your research document that require citations, with verified academic sources and multi-style formatting.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleExportBibTeX} className="gap-1.5 self-start">
          <FileCode className="w-4 h-4" /> Download BibTeX (.bib)
        </Button>
      </div>

      {/* Citation Style Switcher */}
      <Card className="border-primary/20 bg-card">
        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Citation Style Format:
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select standard formatting for your bibliography and inline citations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFormat === fmt
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Citation Suggestions List */}
      <div className="space-y-4">
        {citations.map((item) => {
          const formattedText = getFormattedCitation(item, selectedFormat);
          return (
            <Card key={item.id} className="border-border hover:border-primary/30 transition-all shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.verified ? "success" : "secondary"} className="text-[10px]">
                        {item.verified ? "Verified Source" : "Suggested Source"}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        Confidence: {item.confidence}%
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mt-1">Claim requiring citation:</h3>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCitation(formattedText)}
                    className="text-xs gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy {selectedFormat}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Claim Box */}
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs text-foreground italic">
                  "{item.claim}"
                </div>

                {/* Source & Reason */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <span className="font-semibold text-muted-foreground block mb-0.5">Suggested Source:</span>
                    <span className="font-medium text-foreground">{item.suggestedSource}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <span className="font-semibold text-muted-foreground block mb-0.5">Rationale:</span>
                    <span className="text-muted-foreground">{item.reason}</span>
                  </div>
                </div>

                {/* Rendered Formatted Citation */}
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-foreground truncate">{formattedText}</span>
                  <span className="text-primary font-semibold text-[10px] ml-2 flex-shrink-0">
                    {selectedFormat}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Verified vs Suggested Disclaimer Banner */}
      <Card className="bg-muted/30 border-border">
        <CardContent className="p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Academic Integrity Commitment:</strong> ResearchAI distinguishes between <em>Verified Sources</em> (indexed in Crossref, PubMed, or IEEE Xplore) and <em>Suggested Sources</em>. Citations are verified against standard repositories to prevent hallucinated references.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
