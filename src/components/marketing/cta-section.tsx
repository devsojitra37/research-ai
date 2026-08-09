import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/20 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Ready to transform your research?
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Your Research.{" "}
          <span className="gradient-text">Smarter.</span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Upload your research paper and turn complex academic work into summaries,
          insights, charts, citations, and professional presentations in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button variant="gradient" size="xl" className="group animate-pulse-glow">
              Analyze My Research — Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required · Works with PDF, DOCX, TXT, PPTX
        </p>
      </div>
    </section>
  );
}
