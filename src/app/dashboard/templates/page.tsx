"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Templates</h1>
        <p className="text-muted-foreground text-sm mt-1">Pre-built templates for research reports, presentations, and infographics.</p>
      </div>
      <Card><CardContent className="py-16">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-muted/50 mb-4"><FileText className="w-10 h-10 text-muted-foreground" /></div>
          <h3 className="text-lg font-semibold mb-2">Templates coming soon</h3>
          <p className="text-sm text-muted-foreground">Professional templates for research presentations, infographics, and reports are being prepared.</p>
        </div>
      </CardContent></Card>
    </div>
  );
}
