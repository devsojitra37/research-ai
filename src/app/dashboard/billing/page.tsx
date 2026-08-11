"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
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
  Download,
  X,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface PaymentItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  createdAt: string;
  invoiceUrl: string | null;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BillingPage() {
  const { user, refreshUser } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Mock Modal State
  const [mockModalOpen, setMockModalOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [simulatingPayment, setSimulatingPayment] = useState(false);

  const currentPlanSlug = user?.subscription?.plan?.slug || "FREE";

  // Load payment history
  const fetchPayments = async () => {
    try {
      setLoadingHistory(true);
      const res = await fetch("/api/payments/history");
      if (res.ok) {
        const data = await res.json();
        setPayments(data.payments || []);
      }
    } catch {
      console.error("Failed to load payment history");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchPayments();

    // Dynamically load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubscribe = async (planSlug: string, planName: string) => {
    if (planSlug === "FREE") {
      toast.info("You are already on the Free plan.");
      return;
    }

    if (planSlug === "INSTITUTION") {
      toast.info("Contact institution sales at sales@researchai.edu for custom volume licensing.");
      return;
    }

    setLoadingPlan(planSlug);

    try {
      // 1. Create order
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planSlug, billingCycle }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast.error(orderData.error || "Failed to initiate payment");
        setLoadingPlan(null);
        return;
      }

      // 2. Check if real Razorpay SDK is loaded and keys present
      if (!orderData.isMock && window.Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "ResearchAI",
          description: `${planName} Plan (${billingCycle})`,
          order_id: orderData.orderId,
          handler: async (response: any) => {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planSlug,
              billingCycle,
            });
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
          },
          theme: {
            color: "#3b82f6",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoadingPlan(null);
      } else {
        // Test / Simulation Mode Modal
        setPendingOrder({ ...orderData, planSlug, planName });
        setMockModalOpen(true);
        setLoadingPlan(null);
      }
    } catch (error) {
      console.error("Subscription initiation error:", error);
      toast.error("An error occurred starting checkout.");
      setLoadingPlan(null);
    }
  };

  const verifyPayment = async (payload: any) => {
    try {
      setSimulatingPayment(true);
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Payment verification failed");
        return;
      }

      toast.success(data.message || `Successfully upgraded to ${payload.planSlug} plan!`);
      setMockModalOpen(false);
      setPendingOrder(null);
      await refreshUser();
      await fetchPayments();
    } catch {
      toast.error("Failed to complete payment verification");
    } finally {
      setSimulatingPayment(false);
    }
  };

  const handleSimulateCheckoutSuccess = async () => {
    if (!pendingOrder) return;
    await verifyPayment({
      razorpay_order_id: pendingOrder.orderId,
      razorpay_payment_id: `pay_test_${Math.random().toString(36).substring(2, 10)}`,
      razorpay_signature: "mock_signature_valid",
      planSlug: pendingOrder.planSlug,
      billingCycle,
    });
  };

  const handleDownloadInvoice = (payment: PaymentItem) => {
    const invoiceContent = `===========================================
RESEARCH AI - OFFICIAL TAX INVOICE
===========================================
Invoice ID: INV-${payment.id.slice(-8).toUpperCase()}
Date: ${new Date(payment.createdAt).toLocaleDateString()}
Customer: ${user?.name || "Valued Researcher"} (${user?.email})
-------------------------------------------
Item Description                     Amount
-------------------------------------------
${payment.description || "ResearchAI Subscription"}   ₹${payment.amount}
-------------------------------------------
Total Paid:                          ₹${payment.amount} ${payment.currency}
Payment Provider:                    Razorpay (Secured)
Status:                              COMPLETED
===========================================
Thank you for supporting scientific research!
https://researchai.edu
===========================================`;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_ResearchAI_${payment.id.slice(-6)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Invoice receipt downloaded!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Billing & Subscription <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </h1>
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

      {/* Active Subscription Banner */}
      <Card className="bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-card border-primary/20">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="gradient" className="text-xs uppercase font-bold px-2.5 py-0.5">
                Current Active Plan
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {user?.subscription?.billingCycle ? `(${user.subscription.billingCycle})` : "(monthly)"}
              </span>
            </div>
            <h2 className="text-xl font-bold">
              {user?.subscription?.plan?.name || "Free"} Plan
            </h2>
            <p className="text-xs text-muted-foreground">
              You currently have <strong className="text-foreground font-semibold">{user?.creditBalance?.amount ?? 15} AI credits</strong> remaining.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Your subscription is active.")}
            >
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const isCurrent = currentPlanSlug === plan.slug;
          const isYearly = billingCycle === "yearly";
          const displayPrice =
            plan.monthlyPrice === -1
              ? "Custom"
              : isYearly
              ? `₹${Math.round(plan.yearlyPrice / 12)}`
              : `₹${plan.monthlyPrice}`;

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
                  disabled={loadingPlan === plan.slug || isCurrent}
                  onClick={() => handleSubscribe(plan.slug, plan.name)}
                >
                  {loadingPlan === plan.slug ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isCurrent ? (
                    "Active Plan"
                  ) : plan.slug === "INSTITUTION" ? (
                    "Contact Sales"
                  ) : (
                    "Upgrade Plan"
                  )}
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
            {loadingHistory ? (
              <div className="py-6 text-center text-xs text-muted-foreground">Loading payment receipts...</div>
            ) : payments.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground border border-dashed rounded-lg">
                No past invoices found. Subscribe to a plan to generate official receipts.
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors">
                    <div>
                      <p className="font-semibold">{p.description || "Subscription Upgrade"}</p>
                      <p className="text-muted-foreground text-[10px]">
                        {new Date(p.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        • {p.status}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{p.amount}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(p)}
                        className="p-1 h-8 w-8 text-primary"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Test / Demo Payment Simulation Modal */}
      {mockModalOpen && pendingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 relative space-y-6">
            <button
              onClick={() => {
                setMockModalOpen(false);
                setPendingOrder(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Razorpay Checkout</h3>
                <p className="text-xs text-muted-foreground">Secured 256-Bit SSL Payment Gateway</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan Selected:</span>
                <span className="font-semibold text-foreground">{pendingOrder.planName} Plan ({billingCycle})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono text-muted-foreground">{pendingOrder.orderId}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border font-bold text-sm">
                <span>Total Payable:</span>
                <span className="text-emerald-400">₹{pendingOrder.amount / 100} INR</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Test Payment Simulation Enabled</span>
              </div>
              <Button
                variant="gradient"
                className="w-full h-11 text-sm font-semibold"
                disabled={simulatingPayment}
                onClick={handleSimulateCheckoutSuccess}
              >
                {simulatingPayment ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Complete Test Payment (₹{pendingOrder.amount / 100})
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
