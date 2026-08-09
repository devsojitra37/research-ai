// ===========================================
// ResearchAI — Application Configuration
// ===========================================

export const siteConfig = {
  name: "ResearchAI",
  tagline: "Turn Research Into Impact.",
  description:
    "Upload your research paper or project report and let AI summarize, analyze, visualize, improve, and transform it into professional presentations.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};

export const plans = [
  {
    name: "Free",
    slug: "FREE" as const,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with basic research analysis",
    features: [
      "3 document analyses/month",
      "Basic summaries",
      "Simple Language mode",
      "Limited AI generation",
      "Watermarked exports",
    ],
    limits: {
      documentsPerMonth: 3,
      monthlyCredits: 15,
    },
    highlighted: false,
  },
  {
    name: "Student",
    slug: "STUDENT" as const,
    monthlyPrice: 299,
    yearlyPrice: 2870, // ~20% discount
    description: "Perfect for students and final-year projects",
    features: [
      "30 documents/month",
      "Full AI summaries",
      "Citation assistant",
      "Chart generation",
      "Presentation generation",
      "No watermark",
      "PDF/DOCX export",
    ],
    limits: {
      documentsPerMonth: 30,
      monthlyCredits: 200,
    },
    highlighted: true,
  },
  {
    name: "Researcher",
    slug: "RESEARCHER" as const,
    monthlyPrice: 799,
    yearlyPrice: 7670, // ~20% discount
    description: "Advanced tools for serious research",
    features: [
      "100 documents/month",
      "Advanced research analysis",
      "Citation tools",
      "Similarity analysis",
      "Charts & Infographics",
      "Presentation generation",
      "Priority AI processing",
      "Advanced exports",
    ],
    limits: {
      documentsPerMonth: 100,
      monthlyCredits: 800,
    },
    highlighted: false,
  },
  {
    name: "Institution",
    slug: "INSTITUTION" as const,
    monthlyPrice: -1, // Custom
    yearlyPrice: -1,
    description: "For universities and research departments",
    features: [
      "Multiple users",
      "Admin dashboard",
      "Usage analytics",
      "Shared workspace",
      "Institution branding",
      "Bulk processing",
      "Dedicated support",
    ],
    limits: {
      documentsPerMonth: -1,
      monthlyCredits: -1,
    },
    highlighted: false,
  },
] as const;

export const creditCosts = {
  documentAnalysis: 5,
  presentationGeneration: 10,
  infographicGeneration: 5,
  similarityAnalysis: 5,
  aiRewriting: 1,
  citationGeneration: 2,
  chartGeneration: 2,
  simpleLanguage: 1,
} as const;

export const featureFlags = {
  citationAssistant: process.env.ENABLE_CITATION_ASSISTANT !== "false",
  similarityChecker: process.env.ENABLE_SIMILARITY_CHECKER !== "false",
  presentationGenerator: process.env.ENABLE_PRESENTATION_GENERATOR !== "false",
  infographicGenerator: process.env.ENABLE_INFOGRAPHIC_GENERATOR !== "false",
  publicProfiles: process.env.ENABLE_PUBLIC_PROFILES !== "false",
  referrals: process.env.ENABLE_REFERRALS !== "false",
  blog: process.env.ENABLE_BLOG !== "false",
  aiDemoMode: process.env.ENABLE_AI_DEMO_MODE === "true",
} as const;

export const navigation = {
  dashboard: [
    { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "My Research", href: "/dashboard/projects", icon: "FolderOpen" },
    { name: "Upload Document", href: "/dashboard/upload", icon: "Upload" },
    { name: "AI Analysis", href: "/dashboard/analysis", icon: "Brain" },
    { name: "Citations", href: "/dashboard/citations", icon: "Quote" },
    { name: "Charts & Infographics", href: "/dashboard/charts", icon: "BarChart3" },
    { name: "Presentations", href: "/dashboard/presentations", icon: "Presentation" },
    { name: "Similarity Checker", href: "/dashboard/similarity", icon: "Search" },
    { name: "Simple Language", href: "/dashboard/simple-language", icon: "MessageSquare" },
    { name: "Writing Assistant", href: "/dashboard/writing-assistant", icon: "Sparkles" },
    { name: "Saved Results", href: "/dashboard/saved", icon: "Bookmark" },
    { name: "Templates", href: "/dashboard/templates", icon: "FileText" },
    { name: "Admin Panel", href: "/dashboard/admin", icon: "Settings" },
  ],
  account: [
    { name: "Billing", href: "/dashboard/billing", icon: "CreditCard" },
    { name: "Profile", href: "/dashboard/profile", icon: "User" },
    { name: "Help & Support", href: "/dashboard/support", icon: "HelpCircle" },
  ],
} as const;
