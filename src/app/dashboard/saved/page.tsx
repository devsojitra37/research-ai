"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Saved Results</h1>
        <p className="text-muted-foreground text-sm mt-1">Access your bookmarked analysis results and insights.</p>
      </div>
      <Card><CardContent className="py-16">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-muted/50 mb-4"><Bookmark className="w-10 h-10 text-muted-foreground" /></div>
          <h3 className="text-lg font-semibold mb-2">No saved results</h3>
          <p className="text-sm text-muted-foreground">Bookmark AI analysis results, summaries, and insights to access them quickly.</p>
        </div>
      </CardContent></Card>
    </div>
  );
}
