"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ShieldAlert, ArrowLeft, CheckCircle2, BookOpen } from "lucide-react";

export default function AcademicIntegrityPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold text-sm">Back to Home</span>
          </Link>
          <span className="font-bold text-sm">Academic Integrity & AI Ethics</span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 space-y-6 w-full">
        <div>
          <Badge variant="gradient">Academic Ethics Statement</Badge>
          <h1 className="text-3xl font-extrabold mt-2">Academic Integrity & Responsible AI Policy</h1>
          <p className="text-xs text-muted-foreground mt-1">ResearchAI Principles & Usage Guidelines</p>
        </div>

        <Card className="border-amber-500/30 bg-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-amber-400">
              <ShieldAlert className="w-5 h-5" /> Core Academic Misconduct Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs leading-relaxed text-muted-foreground">
            <p className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-foreground font-medium">
              ResearchAI is designed strictly as an <strong>educational research assistant and document comprehension suite</strong>. Users remain 100% legally and ethically responsible for the academic integrity, factual accuracy, and original authorship of submitted papers, theses, and project reports.
            </p>

            <h3 className="font-bold text-sm text-foreground pt-2">1. Acceptable Educational Use Cases</h3>
            <div className="space-y-2">
              {[
                "Generating summaries to quickly comprehend complex research papers.",
                "Using 'Explain in Simple Language' to understand difficult methodology concepts.",
                "Formatting citations according to APA 7, MLA, or IEEE standard styles.",
                "Creating presentation slide decks and charts from student project data.",
                "Refining grammar, academic tone, and removing word repetition in original drafts.",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-sm text-foreground pt-3">2. Unacceptable Misconduct</h3>
            <p>
              Users must not represent AI-generated outputs as uncredited original human research where institutional regulations prohibit AI tool usage. Always consult your university or journal's AI attribution policy.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
