"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleAnalysisData } from "@/lib/ai-service";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Info,
  FileText,
  Percent,
} from "lucide-react";

export default function SimilarityPage() {
  const report = sampleAnalysisData.similarityReport;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Similarity & Plagiarism Analysis</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Compare document text against academic literature, proceedings, and web repositories to ensure original writing.
          </p>
        </div>
        <Button variant="gradient" size="sm" className="gap-1.5 self-start">
          <Search className="w-4 h-4" /> Run Deep Check
        </Button>
      </div>

      {/* Overall Score Header Banner */}
      <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-primary/5">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-card border-2 border-emerald-500 flex flex-col items-center justify-center shadow-lg">
              <span className="text-3xl font-extrabold text-emerald-400">{report.overallScore}%</span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase">Similarity</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Low Risk / High Originality</Badge>
                <Badge variant="outline">{report.matchedCount} Phrase Matches</Badge>
              </div>
              <h2 className="text-lg font-bold mt-1">Document Originality Status</h2>
              <p className="text-xs text-muted-foreground max-w-md mt-0.5">
                88% of your document contains completely unique syntax and custom research structure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="p-3 rounded-xl bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground">Originality</p>
              <p className="text-lg font-bold text-emerald-400">88%</p>
            </div>
            <div className="p-3 rounded-xl bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground">Matched Sources</p>
              <p className="text-lg font-bold text-primary">{report.matchedCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matched Sections List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Matched Sections & Text Highlights
          </CardTitle>
          <CardDescription>
            Highlighted excerpts that show structural similarity with published literature.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {report.matchedSections.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">{sec.section}</span>
                <Badge variant="secondary" className="text-xs">
                  {sec.similarity}% Similarity
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs font-mono leading-relaxed text-foreground">
                "{sec.text}"
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Source: <strong className="text-foreground">{sec.source}</strong></span>
                {sec.url && (
                  <a
                    href={sec.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    View Source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mandatory Disclaimer Banner */}
      <Card className="bg-amber-500/10 border-amber-500/30">
        <CardContent className="p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-xs text-amber-400 uppercase tracking-wider">
              Legal Disclaimer & Academic Integrity
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {report.disclaimer}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
