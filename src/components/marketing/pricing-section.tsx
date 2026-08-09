"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { plans } from "@/config";

function formatCurrencyDisplay(amount: number): string {
  if (amount <= 0) return "Custom";
  return `₹${amount}`;
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-muted/30 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold text-pink-400 uppercase tracking-wider mb-3">
            Simple Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Plans That Scale With{" "}
            <span className="gradient-text">Your Research</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
              isYearly ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            aria-label="Toggle yearly pricing"
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                isYearly ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly
          </span>
          {isYearly && (
            <Badge variant="success" className="text-xs">
              Save ~20%
            </Badge>
          )}
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const isCustom = price < 0;
            const isHighlighted = plan.highlighted;

            return (
              <Card
                key={plan.slug}
                className={`relative flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  isHighlighted
                    ? "border-primary/50 shadow-lg shadow-primary/10 scale-[1.02]"
                    : "hover:shadow-lg"
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 px-3">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Price */}
                  <div className="mb-6">
                    {isCustom ? (
                      <div className="text-3xl font-bold">Custom</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {formatCurrencyDisplay(price)}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /{isYearly ? "year" : "month"}
                        </span>
                      </div>
                    )}
                    {isYearly && !isCustom && price > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ₹{Math.round(price / 12)}/month when billed yearly
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={isCustom ? "/contact" : "/register"}>
                    <Button
                      variant={isHighlighted ? "gradient" : "outline"}
                      className="w-full"
                    >
                      {isCustom ? "Contact Sales" : price === 0 ? "Start for Free" : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
