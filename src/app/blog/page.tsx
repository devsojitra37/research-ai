"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Search,
} from "lucide-react";

export const sampleArticles = [
  {
    slug: "how-to-write-final-year-project-report",
    title: "How to Write an Impressive Final-Year Project Report with AI",
    category: "Final Year Projects",
    excerpt: "Learn step-by-step how engineering and BCA/MCA students can structure their project report, abstract, system architecture diagrams, and methodology for top grades.",
    author: "Dr. Ananya Roy",
    date: "Aug 05, 2026",
    readTime: "6 min read",
  },
  {
    slug: "top-ai-tools-for-academic-researchers-2026",
    title: "Top 7 AI Tools for Academic Researchers in 2026",
    category: "AI in Education",
    excerpt: "A comprehensive review of the best AI platforms for research paper summarization, citation tracking, literature discovery, and presentation deck generation.",
    author: "ResearchAI Editorial",
    date: "Jul 28, 2026",
    readTime: "8 min read",
  },
  {
    slug: "mastering-apa7-ieee-citation-formats",
    title: "Mastering APA 7 and IEEE Citation Styles: A Complete Guide",
    category: "Citation Guides",
    excerpt: "Avoid common referencing mistakes in IEEE journals and APA dissertations. Includes citation formatting examples and automated citation tool tips.",
    author: "Prof. Vikram Malhotra",
    date: "Jul 15, 2026",
    readTime: "5 min read",
  },
];

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Research Tips",
    "Academic Writing",
    "AI in Education",
    "Final Year Projects",
    "Research Methodology",
    "Citation Guides",
  ];

  const filtered = selectedCategory === "All" ? sampleArticles : sampleArticles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg">
              Research<span className="gradient-text">AI</span> Blog
            </span>
          </Link>

          <Link href="/dashboard">
            <Button variant="gradient" size="sm">Go to App</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 space-y-8 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gradient">Academic Insights & Guides</Badge>
          <h1 className="text-3xl font-extrabold">Research & Academic Writing Blog</h1>
          <p className="text-sm text-muted-foreground">
            Tips, tutorials, citation guides, and AI techniques for students, researchers, and academic professionals.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <Card key={art.slug} className="border-border hover:border-primary/40 transition-all flex flex-col justify-between hover:shadow-md">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <Badge variant="secondary">{art.category}</Badge>
                  <span className="text-muted-foreground">{art.readTime}</span>
                </div>
                <CardTitle className="text-base leading-snug hover:text-primary transition-colors">
                  <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                </CardTitle>
                <CardDescription className="text-xs line-clamp-3">
                  {art.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
                  <span>By {art.author}</span>
                  <span>{art.date}</span>
                </div>
                <Link href={`/blog/${art.slug}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
