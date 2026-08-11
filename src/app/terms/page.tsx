"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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

          <Link href="/register">
            <Button variant="gradient" size="sm">Get Started Free</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 space-y-6 w-full">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" /> Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Effective Date: August 2026</p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6 md:p-8 space-y-6 text-sm text-foreground/90 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using ResearchAI ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">2. Academic & Ethical Integrity</h2>
              <p>
                ResearchAI provides automated research assistance, paper summaries, citation recommendations, visual charts, and presentation deck tools. Users are strictly responsible for maintaining academic integrity, ensuring appropriate citation of all work, and complying with their academic or research institution guidelines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">3. User Data & Privacy</h2>
              <p>
                Documents uploaded to ResearchAI are encrypted in transit and at rest. ResearchAI does not sell your private research papers or use user-uploaded manuscripts for public LLM training datasets.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">4. Subscriptions & Payments</h2>
              <p>
                Paid tier subscriptions (Student, Researcher, Institution) are billed in advance on a recurring monthly or annual basis. Credits and features are credited upon successful transaction verification.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-foreground">5. Disclaimer of Warranties</h2>
              <p>
                AI-generated summaries, quality scores, similarity indicators, and formatting suggestions are provided "as is" to assist academic workflows. Users are advised to review and verify references before submission.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
