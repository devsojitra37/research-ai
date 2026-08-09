"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { aiService } from "@/lib/ai-service";
import {
  Wand2,
  Sparkles,
  BookOpen,
  Copy,
  CheckCircle2,
  Zap,
  RefreshCw,
  FileText,
  HelpCircle,
  FlaskConical,
  Target,
} from "lucide-react";

export default function WritingAssistantPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleRewrite = async (mode: "academic" | "simplify" | "concise" | "expand") => {
    if (!inputText.trim()) {
      toast.error("Please enter or paste text to refine!");
      return;
    }
    setLoadingAction(mode);
    const result = await aiService.rewriteText(inputText, mode);
    setOutputText(result);
    setLoadingAction(null);
    toast.success(`Text transformed: ${mode.toUpperCase()}!`);
  };

  const handleGenerateSection = (section: string) => {
    setLoadingAction(section);
    setTimeout(() => {
      if (section === "abstract") {
        setOutputText(
          `Abstract: This paper investigates deep learning methodologies for automated bio-signal processing. We propose HeartNet-Transformer, achieving 98.4% diagnostic accuracy across 100,000+ benchmark samples while keeping operational latency under 12ms for edge device deployment.`
        );
      } else if (section === "conclusion") {
        setOutputText(
          `Conclusion: In summary, combining multi-scale 1D spatial convolutions with self-attention transformer layers offers a reliable, low-latency framework for continuous cardiac monitoring on wearable devices.`
        );
      } else if (section === "questions") {
        setOutputText(
          `Research Questions:\n1. How does self-attention mechanism improve temporal sequence classification in noisy ECG bio-signals?\n2. What is the minimum computational complexity required to achieve >97% diagnostic accuracy on microcontroller hardware?`
        );
      } else {
        setOutputText(
          `Future Scope: Future work includes conducting multi-center clinical trials, validating cross-patient generalization on diverse demographic cohorts, and integrating real-time telemetry streaming.`
        );
      }
      setLoadingAction(null);
      toast.success(`Generated ${section.toUpperCase()}!`);
    }, 500);
  };

  const handleCopyOutput = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast.success("Copied output to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold">AI Research Writing Assistant</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Improve academic tone, eliminate repetition, make text concise, or auto-generate abstracts, research questions, and conclusions.
        </p>
      </div>

      {/* Action Toolbar */}
      <Card className="border-primary/20 bg-card">
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Text Transformation Actions:
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRewrite("academic")}
              disabled={!!loadingAction}
              className="text-xs gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-primary" /> Make Academic Tone
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRewrite("concise")}
              disabled={!!loadingAction}
              className="text-xs gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Make Concise
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRewrite("expand")}
              disabled={!!loadingAction}
              className="text-xs gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Expand & Elaborate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRewrite("simplify")}
              disabled={!!loadingAction}
              className="text-xs gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-emerald-400" /> Simplify Grammar
            </Button>
          </div>

          <div className="border-t border-border pt-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Auto-Generate Academic Sections:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => handleGenerateSection("abstract")} className="text-xs gap-1">
                <FileText className="w-3.5 h-3.5" /> Generate Abstract
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleGenerateSection("conclusion")} className="text-xs gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Generate Conclusion
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleGenerateSection("questions")} className="text-xs gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Generate Research Questions
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleGenerateSection("future")} className="text-xs gap-1">
                <Target className="w-3.5 h-3.5" /> Future Scope
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor Split View */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Card */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Original Text Input</span>
              <Button variant="ghost" size="sm" onClick={() => setInputText("")} className="text-xs">
                Clear
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={12}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or write your draft text, paragraph, abstract, or methodology snippet here..."
              className="w-full p-4 rounded-xl bg-muted/30 border border-border text-sm focus:border-primary focus:outline-none transition-colors"
            />
          </CardContent>
        </Card>

        {/* Output Card */}
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between text-primary">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5" /> AI Output Result
              </span>
              <Button variant="outline" size="sm" onClick={handleCopyOutput} disabled={!outputText} className="text-xs gap-1">
                <Copy className="w-3.5 h-3.5" /> Copy Result
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-card border border-border text-sm leading-relaxed text-foreground min-h-[280px] whitespace-pre-line">
              {outputText ? (
                outputText
              ) : (
                <span className="text-muted-foreground text-xs italic">
                  Select an action above to see transformed text or generated section output...
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
