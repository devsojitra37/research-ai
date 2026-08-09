import Link from "next/link";
import { Brain, Sparkles, ExternalLink, Mail, Globe } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Blog", href: "/blog" },
  ],
  Resources: [
    { name: "Help Center", href: "/help" },
    { name: "API Documentation", href: "/docs" },
    { name: "Research Tips", href: "/blog" },
    { name: "Contact Support", href: "/support" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "AI Usage Policy", href: "/ai-policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Research<span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Turn your research into something everyone can understand.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground" aria-label="Links">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResearchAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Sparkles className="w-3.5 h-3.5 text-violet-400 mx-0.5" /> for researchers worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
