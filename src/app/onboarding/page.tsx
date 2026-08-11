"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  GraduationCap,
  Microscope,
  BookOpen,
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  FileText
} from "lucide-react";
import Link from "next/link";

const roles = [
  { id: "STUDENT", label: "Student", desc: "B.Tech, BCA, MCA, Engineering, Medical, Management, Final-Year Project", icon: GraduationCap },
  { id: "RESEARCHER", label: "Researcher", desc: "PhD Candidate, Academic Researcher, Research Assistant, Independent Researcher", icon: Microscope },
  { id: "PROFESSOR", label: "Professor / Teacher", desc: "Lecturer, Assistant Professor, Department Chair, Academic Mentor", icon: BookOpen },
  { id: "INSTITUTION", label: "Institution / Lab", desc: "College, University, R&D Department, Research Lab", icon: Building2 },
  { id: "OTHER", label: "Other Professional", desc: "Industry Expert, Technical Writer, Science Communicator", icon: Brain },
];

const researchAreas = [
  "Artificial Intelligence & ML",
  "Computer Science & Engineering",
  "Medical & Health Sciences",
  "Biotechnology & Genetics",
  "Data Science & Analytics",
  "Robotics & Automation",
  "Electrical & Electronics",
  "Mechanical & Civil Engineering",
  "Business & Financial Economics",
  "Physics & Material Science",
  "Environmental & Earth Sciences",
  "Social Sciences & Humanities"
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("STUDENT");
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["Artificial Intelligence & ML", "Computer Science & Engineering"]);

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleFinish = async () => {
    try {
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: selectedRole,
          researchAreas: selectedAreas,
          onboardingCompleted: true,
        }),
      });
    } catch (err) {
      console.error("Failed to save onboarding data:", err);
    }
    router.push("/dashboard/upload?onboarded=true");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-md">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-bold">
          Research<span className="gradient-text">AI</span>
        </span>
      </div>

      <Card className="w-full max-w-2xl border-border/60 shadow-2xl backdrop-blur-xl bg-card/90 animate-fade-in">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Step {step} of 3
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step ? "w-8 bg-primary" : s < step ? "w-2 bg-primary/50" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          {/* STEP 1: What are you? */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold">What best describes you?</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  We will tailor your ResearchAI experience, templates, and AI prompts based on your role.
                </p>
              </div>

              <div className="grid gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30 hover:bg-accent/50"
                      }`}
                    >
                      <div className={`p-3 rounded-lg flex-shrink-0 ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">{role.label}</h3>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{role.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <Button variant="gradient" onClick={() => setStep(2)}>
                  Next Step <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: What do you research? */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold">What are your research areas?</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Select one or more topics you focus on. This helps AI optimize keywords and citations.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {researchAreas.map((area) => {
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => toggleArea(area)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>{area}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button variant="gradient" onClick={() => setStep(3)}>
                  Next Step <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Upload your first research document */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-fade-in py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">You&apos;re all set up! 🎉</h2>
                <p className="text-muted-foreground text-sm mt-1 max-w-md mx-auto">
                  Upload your research paper, project report, or dissertation now to generate AI summaries, simple explanations, quality scores, and slides.
                </p>
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer max-w-md mx-auto" onClick={handleFinish}>
                <Upload className="w-10 h-10 text-primary mx-auto mb-2 animate-bounce" />
                <h4 className="font-semibold text-sm">Upload Your First Research Document</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports PDF, DOCX, TXT, PPTX (up to 50MB)
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
                  Skip to Dashboard
                </Button>
                <Button variant="gradient" onClick={handleFinish}>
                  Upload & Analyze Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
