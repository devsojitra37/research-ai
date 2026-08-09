import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ResearchAI — AI-Powered Research Publishing Platform",
    template: "%s | ResearchAI",
  },
  description:
    "Upload your research paper and let AI summarize, analyze, visualize, improve, and transform it into professional presentations. Trusted by students and researchers.",
  keywords: [
    "AI research assistant",
    "research paper summarizer",
    "AI project report generator",
    "research presentation generator",
    "AI citation generator",
    "academic writing AI",
    "research paper analyzer",
  ],
  authors: [{ name: "ResearchAI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "ResearchAI — Turn Research Into Impact",
    description:
      "Upload your research paper and let AI summarize, analyze, visualize, improve, and transform it into professional presentations.",
    siteName: "ResearchAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResearchAI — AI-Powered Research Publishing",
    description:
      "Turn complex academic work into summaries, insights, charts, citations, and presentations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
