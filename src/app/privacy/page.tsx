"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ShieldCheck, Download, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PrivacyPolicyPage() {
  const handleExportData = () => {
    toast.success("Preparing your account data export download (.json)...");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion request initiated. Please confirm via email.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold text-sm">Back to Home</span>
          </Link>
          <span className="font-bold text-sm">Privacy & Data Governance</span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 space-y-6 w-full">
        <div>
          <Badge variant="gradient">GDPR & ISO Compliant</Badge>
          <h1 className="text-3xl font-extrabold mt-2">Privacy Policy & User Data Controls</h1>
          <p className="text-xs text-muted-foreground mt-1">Last Updated: August 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> User Data Rights & Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs leading-relaxed text-muted-foreground">
            <p>
              At ResearchAI, we treat submitted research documents as strictly confidential intellectual property. We do NOT use user research documents to train foundation AI models without explicit opt-in consent.
            </p>

            <div className="p-4 rounded-xl bg-card border border-border space-y-3 text-foreground">
              <h3 className="font-semibold text-xs">Self-Service Privacy Actions:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleExportData} className="text-xs gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Export My Account Data (.json)
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteAccount} className="text-xs gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" /> Delete My Account & Documents
                </Button>
              </div>
            </div>

            <h3 className="font-bold text-sm text-foreground pt-2">1. Information We Collect</h3>
            <p>We collect account credentials, uploaded document metadata, extracted text chunks for AI analysis, and payment billing details handled securely through Razorpay/Stripe.</p>

            <h3 className="font-bold text-sm text-foreground pt-2">2. How Documents Are Processed</h3>
            <p>Documents uploaded to ResearchAI are processed in isolated encrypted server sessions. Text extraction occurs asynchronously, and users can delete documents from our servers at any time.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
