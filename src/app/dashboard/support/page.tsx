"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Mail, MessageSquare, FileText, ExternalLink } from "lucide-react";

const faq = [
  { q: "What file formats are supported?", a: "We support PDF, DOCX, TXT, and PPTX files up to 50MB." },
  { q: "How does the credit system work?", a: "Each AI action costs credits. Document analysis costs 5 credits, presentations cost 10, and simple language explanations cost 1 credit." },
  { q: "Is my research data secure?", a: "Yes. Your documents are encrypted at rest and in transit. We never use your documents for AI training. You can delete your data at any time." },
  { q: "Can I upgrade or downgrade my plan?", a: "Yes, you can change your plan at any time from the Billing page. Changes take effect immediately." },
  { q: "How accurate is the similarity checker?", a: "Our similarity checker provides an AI-powered analysis. It should be used as a guide, not as a definitive legal determination of plagiarism." },
];

export default function SupportPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground text-sm mt-1">Get help with ResearchAI or reach out to our support team.</p>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Frequently Asked Questions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <h4 className="font-medium text-sm mb-1">{item.q}</h4>
              <p className="text-xs text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Mail className="w-5 h-5" /> Contact Support</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="What do you need help with?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Describe your issue in detail..." />
          </div>
          <Button variant="gradient"><MessageSquare className="w-4 h-4" /> Send Message</Button>
        </CardContent>
      </Card>
    </div>
  );
}
