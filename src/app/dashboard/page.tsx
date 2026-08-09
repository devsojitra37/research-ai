"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  FileText,
  Brain,
  Coins,
  Presentation,
  Quote,
  Search,
  Upload,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Clock,
  BarChart3,
} from "lucide-react";

// Demo data for the dashboard (shown when no real data exists)
const demoStats = [
  { label: "Total Documents", value: "0", icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/10", change: "Upload your first" },
  { label: "AI Analyses", value: "0", icon: Brain, color: "text-violet-400", bgColor: "bg-violet-500/10", change: "Get started" },
  { label: "Credits Remaining", value: "15", icon: Coins, color: "text-emerald-400", bgColor: "bg-emerald-500/10", change: "Free tier" },
  { label: "Presentations", value: "0", icon: Presentation, color: "text-amber-400", bgColor: "bg-amber-500/10", change: "Create one" },
];

const quickActions = [
  { label: "Upload Document", href: "/dashboard/upload", icon: Upload, color: "from-blue-600 to-blue-700" },
  { label: "AI Analysis", href: "/dashboard/analysis", icon: Brain, color: "from-violet-600 to-violet-700" },
  { label: "Generate Citations", href: "/dashboard/citations", icon: Quote, color: "from-emerald-600 to-emerald-700" },
  { label: "Create Charts", href: "/dashboard/charts", icon: BarChart3, color: "from-pink-600 to-pink-700" },
  { label: "Check Similarity", href: "/dashboard/similarity", icon: Search, color: "from-amber-600 to-amber-700" },
  { label: "Presentations", href: "/dashboard/presentations", icon: Presentation, color: "from-cyan-600 to-cyan-700" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 skeleton h-64 rounded-xl" />
          <div className="skeleton h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  const credits = user?.creditBalance?.amount ?? 15;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "Researcher"} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here&apos;s what&apos;s happening with your research today.
          </p>
        </div>
        <Link href="/dashboard/upload">
          <Button variant="gradient" className="group">
            <Upload className="w-4 h-4" />
            Upload Document
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoStats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {stat.label === "Credits Remaining" ? credits : stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Recent Documents
              </CardTitle>
              <Link href="/dashboard/projects">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No documents yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                Upload your first research paper, project report, or dissertation to get started.
              </p>
              <Link href="/dashboard/upload">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Subscription & Usage */}
        <div className="space-y-6">
          {/* Plan Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {user?.subscription?.plan?.name || "Free"}
                  </h3>
                  <Badge variant="info" className="mt-1">
                    {user?.subscription?.status || "Active"}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹0</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                </div>
              </div>

              {/* Credits Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Credits Used</span>
                  <span className="font-medium">{15 - credits}/15</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                    style={{ width: `${((15 - credits) / 15) * 100}%` }}
                  />
                </div>
              </div>

              <Link href="/dashboard/billing">
                <Button variant="gradient" size="sm" className="w-full">
                  <Sparkles className="w-4 h-4" />
                  Upgrade to Student — ₹299/mo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card className="bg-gradient-to-br from-primary/5 to-violet-500/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Pro Tip</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Upload a PDF research paper to get an AI-powered summary, quality score, and
                    citation suggestions — all in one click!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
