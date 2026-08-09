"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  GraduationCap,
  Building2,
  Globe,
  FileText,
  Award,
  ExternalLink,
  BookOpen,
  Share2,
} from "lucide-react";

export default function PublicProfilePage() {
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
              Research<span className="gradient-text">AI</span>
            </span>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-6 w-full">
        {/* Profile Card */}
        <Card className="border-border bg-card shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                RS
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Rahul Sharma</h1>
                  <Badge variant="gradient" className="text-[10px]">Verified Researcher</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-primary" /> Indian Institute of Technology (IIT) Bombay
                </p>
                <p className="text-xs text-muted-foreground">
                  Department of Computer Science & Engineering • M.Tech Scholar
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
              Focusing on biomedical signal processing, deep learning transformers for ECG arrhythmia detection, and microcontroller hardware acceleration.
            </p>

            {/* Research Interests Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Artificial Intelligence", "Deep Learning", "Bio-Signal Processing", "Transformers", "Edge Computing"].map((area) => (
                <Badge key={area} variant="secondary" className="text-[10px]">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Public Research Papers List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Published Research & Projects (1)
          </h2>

          <Card className="border-border hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">Research Paper</Badge>
                <span className="text-xs text-emerald-400 font-semibold">Quality Score: 88/100</span>
              </div>
              <CardTitle className="text-base mt-2">
                HeartNet-Transformer: Early Cardiac Arrhythmia Detection from Multi-Lead ECGs
              </CardTitle>
              <CardDescription className="text-xs line-clamp-2 mt-1">
                Evaluated on 109,446 MIT-BIH ECG heartbeats, achieving 98.4% diagnostic accuracy with 12ms edge hardware latency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/research/heartnet-arrhythmia-2026">
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  View Full Research Page <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
