"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  FolderOpen,
  Plus,
  ArrowRight,
  FileText,
  Globe,
  Lock,
  Link2,
  MoreVertical,
  Brain,
  Share2,
  Calendar,
} from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: "p1",
      name: "Final Year AI Project: HeartNet Arrhythmia",
      description: "Deep learning framework combining 1D ResNet and Transformer attention for automated ECG diagnosis.",
      visibility: "PUBLIC",
      documentCount: 3,
      updatedAt: "2 hours ago",
      shareToken: "heartnet-arrhythmia-2026",
    },
    {
      id: "p2",
      name: "Ph.D. Literature Review & Background",
      description: "Comprehensive survey of bio-signal processing algorithms from 2018–2026.",
      visibility: "PRIVATE",
      documentCount: 8,
      updatedAt: "3 days ago",
      shareToken: "phd-lit-review",
    },
    {
      id: "p3",
      name: "Smart Healthcare Telemetry Grant Proposal",
      description: "R&D grant application for microcontroller deployment of bio-transformers.",
      visibility: "LINK",
      documentCount: 2,
      updatedAt: "1 week ago",
      shareToken: "grant-prop-2026",
    },
  ]);

  const handleCreateProject = () => {
    const newProj = {
      id: `p${Date.now()}`,
      name: "New Research Workspace",
      description: "Organized documents, AI analyses, slide decks, and citations.",
      visibility: "PRIVATE",
      documentCount: 1,
      updatedAt: "Just now",
      shareToken: `workspace-${Date.now()}`,
    };
    setProjects([newProj, ...projects]);
    toast.success("Created new research workspace!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Research Workspaces</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Group your documents, AI summaries, slide presentations, citations, and notes.
          </p>
        </div>
        <Button variant="gradient" size="sm" onClick={handleCreateProject} className="gap-1.5">
          <Plus className="w-4 h-4" /> New Workspace
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <Card key={proj.id} className="border-border hover:border-primary/40 transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <Badge
                  variant={proj.visibility === "PUBLIC" ? "success" : proj.visibility === "LINK" ? "info" : "secondary"}
                  className="text-[10px] gap-1"
                >
                  {proj.visibility === "PUBLIC" ? (
                    <>
                      <Globe className="w-3 h-3" /> Public
                    </>
                  ) : proj.visibility === "LINK" ? (
                    <>
                      <Link2 className="w-3 h-3" /> Shared Link
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" /> Private
                    </>
                  )}
                </Badge>
              </div>

              <CardTitle className="text-base mt-2 line-clamp-1">{proj.name}</CardTitle>
              <CardDescription className="text-xs line-clamp-2 mt-1">
                {proj.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> {proj.documentCount} Documents
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {proj.updatedAt}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Link href="/dashboard/analysis" className="w-full">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Open Workspace <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
                {proj.visibility === "PUBLIC" && (
                  <Link href={`/research/${proj.shareToken}`}>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Share2 className="w-4 h-4 text-primary" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
