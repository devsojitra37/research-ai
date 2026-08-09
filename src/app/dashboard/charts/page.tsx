"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { sampleAnalysisData } from "@/lib/ai-service";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  Sparkles,
  Download,
  Presentation,
  Plus,
  Edit3,
  Layers,
  CheckCircle2,
  Workflow,
  Clock,
  LayoutGrid,
} from "lucide-react";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];

export default function ChartsPage() {
  const [activeTab, setActiveTab] = useState<"charts" | "infographics">("charts");
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);
  const [selectedInfographicTemplate, setSelectedInfographicTemplate] = useState("overview");

  const charts = sampleAnalysisData.chartSuggestions;
  const currentChart = charts[selectedChartIndex];

  const handleExportPNG = () => {
    toast.success("Chart exported as high-resolution PNG!");
  };

  const handleAddToPresentation = () => {
    toast.success("Chart added to your Presentation Deck!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Charts & Infographics Generator</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Transform tabular data and research metrics into publication-ready charts and visual infographics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-muted border border-border self-start">
          <button
            onClick={() => setActiveTab("charts")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "charts" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 inline mr-1" /> Interactive Charts
          </button>
          <button
            onClick={() => setActiveTab("infographics")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "infographics" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1" /> Infographic Templates
          </button>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE CHARTS */}
      {activeTab === "charts" && (
        <div className="space-y-6 animate-fade-in">
          {/* Chart Selection Buttons */}
          <div className="grid sm:grid-cols-3 gap-3">
            {charts.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedChartIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedChartIndex === idx
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border hover:bg-accent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {c.type} Chart
                  </Badge>
                  {selectedChartIndex === idx && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <h3 className="font-semibold text-sm mt-2 line-clamp-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{c.description}</p>
              </button>
            ))}
          </div>

          {/* Rendered Chart Canvas */}
          <Card className="border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{currentChart.title}</CardTitle>
                <CardDescription>{currentChart.description}</CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleExportPNG} className="text-xs gap-1">
                  <Download className="w-3.5 h-3.5" /> Download PNG
                </Button>
                <Button variant="gradient" size="sm" onClick={handleAddToPresentation} className="text-xs gap-1">
                  <Presentation className="w-3.5 h-3.5" /> Add to Slides
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {currentChart.type === "bar" ? (
                    <BarChart data={currentChart.data}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "none" }} />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Accuracy (%)" />
                      <Bar dataKey="f1" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="F1 Score (%)" />
                    </BarChart>
                  ) : currentChart.type === "line" ? (
                    <LineChart data={currentChart.data}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="epoch" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "none" }} />
                      <Legend />
                      <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" strokeWidth={2} name="Training Loss" />
                      <Line type="monotone" dataKey="valLoss" stroke="#ec4899" strokeWidth={2} name="Validation Loss" />
                    </LineChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={currentChart.data}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }: { name?: string; percent?: number }) =>
                          `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                      >
                        {currentChart.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "none" }} />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SECTION 2: INFOGRAPHIC GENERATOR */}
      {activeTab === "infographics" && (
        <div className="space-y-6 animate-fade-in">
          {/* Template Selection */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { id: "overview", name: "Research Overview", icon: LayoutGrid, desc: "High-level visual summary" },
              { id: "flow", name: "Problem → Method → Result", icon: Workflow, desc: "3-step logical story flow" },
              { id: "timeline", name: "Research Timeline", icon: Clock, desc: "Milestones and roadmap" },
            ].map((tmpl) => {
              const Icon = tmpl.icon;
              const isSelected = selectedInfographicTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedInfographicTemplate(tmpl.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  <Icon className="w-5 h-5 text-primary mb-2" />
                  <h3 className="font-semibold text-sm">{tmpl.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{tmpl.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Infographic Visual Canvas */}
          <Card className="border-border bg-card p-6 md:p-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <Badge variant="gradient">Infographic Preview</Badge>
              <h2 className="text-2xl font-bold">HeartNet-Transformer Research Visual Overview</h2>
              <p className="text-xs text-muted-foreground">Automated multi-lead ECG arrhythmia detection pipeline</p>
            </div>

            {/* Step 1 - 2 - 3 Flow Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center mx-auto text-sm">
                  1
                </div>
                <h4 className="font-bold text-sm">Problem</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  17.9M annual deaths from cardiac disease; existing ECG analyzers suffer high false alarms.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/20 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-violet-500 text-white font-bold flex items-center justify-center mx-auto text-sm">
                  2
                </div>
                <h4 className="font-bold text-sm">Method</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Multi-scale 1D ResNet + Multi-Head Self-Attention Transformer for temporal sequence learning.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto text-sm">
                  3
                </div>
                <h4 className="font-bold text-sm">Result</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  98.4% diagnostic accuracy, 12ms latency suitable for real-time smartwatch monitors.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="gradient" onClick={handleExportPNG} className="gap-2">
                <Download className="w-4 h-4" /> Download Infographic PNG / PDF
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
