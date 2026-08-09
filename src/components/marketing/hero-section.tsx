"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileText,
  BarChart3,
  Presentation,
  Brain,
  Sparkles,
  Upload,
  Zap,
  Shield,
  Star,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" id="hero">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-blue-400/40 animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute top-40 right-[15%] w-1.5 h-1.5 rounded-full bg-violet-400/40 animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }} />
        <div className="absolute bottom-40 left-[20%] w-2.5 h-2.5 rounded-full bg-pink-400/30 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }} />
        <div className="absolute top-60 right-[30%] w-1 h-1 rounded-full bg-blue-300/50 animate-bounce" style={{ animationDuration: "5s", animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-up mb-6">
            <Badge variant="outline" className="px-4 py-1.5 text-sm border-blue-500/30 bg-blue-500/5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              AI-Powered Research Platform
            </Badge>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Turn Your Research Into{" "}
            <span className="gradient-text">Something Everyone</span>{" "}
            Can Understand
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Upload your research paper or project report and let AI summarize, analyze,
            visualize, improve, and transform it into professional presentations.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/register">
              <Button variant="gradient" size="xl" className="group">
                Analyze My Research — Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="xl">
                Explore Features
              </Button>
            </a>
          </div>

          <p
            className="text-sm text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Shield className="w-3.5 h-3.5 inline mr-1" />
            No credit card required · Free forever plan available
          </p>
        </div>

        {/* Dashboard Preview */}
        <div
          className="mt-16 max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-2xl shadow-blue-500/5 overflow-hidden">
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                  researchai.com/dashboard
                </div>
              </div>
            </div>

            {/* Mock Dashboard */}
            <div className="p-6 space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Documents", value: "24", icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/10" },
                  { label: "AI Analyses", value: "18", icon: Brain, color: "text-violet-400", bgColor: "bg-violet-500/10" },
                  { label: "Charts Created", value: "12", icon: BarChart3, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
                  { label: "Presentations", value: "6", icon: Presentation, color: "text-amber-400", bgColor: "bg-amber-500/10" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border/50 bg-background/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Row */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Recent Documents */}
                <div className="md:col-span-2 rounded-xl border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Recent Documents</h3>
                    <Badge variant="info" className="text-[10px]">3 New</Badge>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: "Machine Learning in Healthcare.pdf", status: "Completed", statusColor: "text-emerald-400" },
                      { name: "Blockchain Supply Chain.docx", status: "Analyzing", statusColor: "text-blue-400" },
                      { name: "IoT Security Framework.pdf", status: "Completed", statusColor: "text-emerald-400" },
                    ].map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{doc.name}</span>
                        </div>
                        <span className={`text-xs font-medium ${doc.statusColor}`}>{doc.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Score */}
                <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                  <h3 className="text-sm font-semibold mb-4">Research Quality</h3>
                  <div className="flex items-center justify-center py-4">
                    <div className="relative w-28 h-28">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#scoreGradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="45.2" />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">82</span>
                        <span className="text-[10px] text-muted-foreground">/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="success" className="text-[10px]">Good Quality</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </div>
        </div>

        {/* Social Proof */}
        <div
          className="mt-16 text-center animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-sm text-muted-foreground mb-6">
            Designed for students and researchers worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {["Students", "Researchers", "Professors", "Universities", "Institutions"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
