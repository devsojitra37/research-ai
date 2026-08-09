"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, Calendar, User, Share2, Sparkles } from "lucide-react";

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold text-sm">Back to Blog</span>
          </Link>

          <Link href="/register">
            <Button variant="gradient" size="sm">Try ResearchAI Free</Button>
          </Link>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 space-y-6 w-full">
        <div className="space-y-3">
          <Badge variant="gradient" className="text-xs">Final Year Projects</Badge>
          <h1 className="text-3xl font-extrabold leading-tight">
            How to Write an Impressive Final-Year Project Report with AI
          </h1>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-b border-border pb-4">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <User className="w-3.5 h-3.5 text-primary" /> Dr. Ananya Roy
            </span>
            <span>• Aug 05, 2026</span>
            <span>• 6 min read</span>
          </div>
        </div>

        {/* Content */}
        <article className="prose dark:prose-invert text-sm leading-relaxed space-y-4 text-foreground/90">
          <p className="text-base font-medium">
            Writing a final-year project report or dissertation is one of the most important milestones for undergraduate and postgraduate engineering and MCA students.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-6">1. Structure Your Report Correctly</h2>
          <p>
            Standard academic reports follow a 7-section structure: Executive Abstract, Introduction & Problem Statement, Literature Survey, Proposed Architecture/Methodology, Implementation & Code, Results & Evaluation, and References.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-6">2. Use AI for Abstract & Citation Assistant</h2>
          <p>
            Instead of spending hours manually generating references or rewriting dense paragraphs, leverage ResearchAI to extract key findings, convert complex technical code into simple explanations, and output perfect IEEE or APA 7 citations.
          </p>

          <h2 className="text-lg font-bold text-foreground mt-6">3. Prepare Visual Presentation Slides</h2>
          <p>
            Your final viva defense requires clear slide decks. Use ResearchAI's "Convert to Presentation" feature to automatically create 14-slide academic presentations with speaker notes and charts.
          </p>
        </article>

        {/* Bottom CTA Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-center space-y-3 shadow-lg">
          <h3 className="text-lg font-bold">Ready to transform your project report?</h3>
          <p className="text-xs opacity-90">Upload your PDF or DOCX to ResearchAI and generate summaries, charts, and slide presentations in minutes.</p>
          <Link href="/register">
            <Button variant="secondary" size="sm" className="font-semibold text-xs">
              Start Free — Upload Document
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
