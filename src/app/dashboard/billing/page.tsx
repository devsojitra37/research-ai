"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { plans, creditCosts } from "@/config";
import {
  CreditCard,
  Sparkles,
  Check,
  Coins,
  Receipt,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");

  const handleSubscribe = (planSlug: string, planName: string) => {
    if (planSlug === "FREE") {
      toast.info("You are already on the Free plan.");
      return;
    }
    toast.success(`Initiating secure Razorpay checkout for ${planName} (${billingCycle})...`);
    setTimeout(() => {
      setCurrentPlan(planSlug);
      toast.success(`Subscribed to ${planName} Plan!`);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Billing & Subscription</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your subscription plan, AI credit balance, and download invoice receipts.
          </p>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-card border border-border shadow-sm self-start">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === "monthly" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              billingCycle === "yearly" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly <Badge variant="success" className="text-[9px] px-1 py-0">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.slug;
          const isYearly = billingCycle === "yearly";
          const displayPrice = plan.monthlyPrice === -1 ? "Custom" : isYearly ? `₹${Math.round(plan.yearlyPrice / 12)}` : `₹${plan.monthlyPrice}`;

          return (
            <Card
              key={plan.slug}
              className={`relative flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary shadow-xl bg-gradient-to-b from-primary/10 via-card to-card"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="gradient" className="text-[10px] uppercase font-bold px-2.5 py-0.5">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-0.5">
                  {plan.description}
                </CardDescription>

                <div className="pt-3">
                  <span className="text-3xl font-extrabold">{displayPrice}</span>
                  {plan.monthlyPrice !== -1 && (
                    <span className="text-xs text-muted-foreground font-normal"> /month</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <ul className="space-y-2">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isCurrent ? "outline" : plan.highlighted ? "gradient" : "secondary"}
                  size="sm"
                  className="w-full text-xs font-semibold mt-4"
                  onClick={() => handleSubscribe(plan.slug, plan.name)}
                >
                  {isCurrent ? "Current Plan" : plan.slug === "INSTITUTION" ? "Contact Sales" : "Upgrade Plan"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Credit Ledger & Usage Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Credit Ledger */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Coins className="w-4.5 h-4.5 text-emerald-400" /> Credit Balance & Rates
            </CardTitle>
            <CardDescription>Usage cost per AI feature action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(creditCosts).map(([action, cost]) => (
              <div key={action} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-muted/30">
                <span className="capitalize text-muted-foreground">{action.replace(/([A-Z])/g, " $1")}</span>
                <Badge variant="secondary" className="text-xs font-mono">{cost} Credits</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Receipt className="w-4.5 h-4.5 text-primary" /> Invoice History
            </CardTitle>
            <CardDescription>Download tax invoices for subscription payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-semibold">Student Plan (Monthly)</p>
                  <p className="text-muted-foreground text-[10px]">AUG 01, 2026 • Razorpay</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹299</span>
                  <Button variant="ghost" size="sm" onClick={() => toast.success("Invoice downloaded!")} className="p-1">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
