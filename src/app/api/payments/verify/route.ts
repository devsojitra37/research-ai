import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planSlug, billingCycle = "monthly" } = await req.json();

    if (!razorpay_order_id || !planSlug) {
      return NextResponse.json({ error: "Order ID and Plan are required" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify HMAC signature if in production with real secret
    if (keySecret && keySecret !== "your-razorpay-key-secret" && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }
    }

    // Fetch Target Plan
    const plan = await prisma.plan.findUnique({
      where: { slug: planSlug },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const isYearly = billingCycle === "yearly";
    const durationDays = isYearly ? 365 : 30;
    const now = new Date();
    const currentPeriodEnd = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    // 1. Update or create Payment record
    const paymentId = razorpay_payment_id || `pay_mock_${Math.random().toString(36).substring(2, 12)}`;
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    const invoiceUrl = `/api/payments/invoice/${invoiceNumber}`;

    await prisma.payment.upsert({
      where: { externalId: razorpay_order_id },
      update: {
        status: "COMPLETED",
        invoiceUrl,
        metadata: JSON.stringify({ planSlug, billingCycle, invoiceNumber, paymentId }),
      },
      create: {
        userId: session.user.id,
        amount: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
        currency: plan.currency,
        status: "COMPLETED",
        provider: "razorpay",
        externalId: razorpay_order_id,
        invoiceUrl,
        description: `${plan.name} Plan (${billingCycle})`,
        metadata: JSON.stringify({ planSlug, billingCycle, invoiceNumber, paymentId }),
      },
    });

    // 2. Upsert Subscription record
    const subscription = await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        planId: plan.id,
        status: "ACTIVE",
        billingCycle,
        currentPeriodStart: now,
        currentPeriodEnd,
        paymentProvider: "razorpay",
        externalId: paymentId,
      },
      create: {
        userId: session.user.id,
        planId: plan.id,
        status: "ACTIVE",
        billingCycle,
        currentPeriodStart: now,
        currentPeriodEnd,
        paymentProvider: "razorpay",
        externalId: paymentId,
      },
      include: { plan: true },
    });

    // 3. Update Credit Balance
    const creditAddAmount = plan.monthlyCredits;
    const updatedCredit = await prisma.creditBalance.upsert({
      where: { userId: session.user.id },
      update: {
        amount: { increment: creditAddAmount },
      },
      create: {
        userId: session.user.id,
        amount: creditAddAmount,
      },
    });

    // 4. Log Credit Transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        amount: creditAddAmount,
        type: "PURCHASED",
        description: `Subscribed to ${plan.name} Plan (${billingCycle})`,
      },
    });

    // 5. Create Notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Subscription Upgraded!",
        message: `You are now on the ${plan.name} plan. ${creditAddAmount} credits added to your account.`,
        type: "SUCCESS",
        link: "/dashboard/billing",
      },
    });

    return NextResponse.json({
      message: `Successfully subscribed to ${plan.name} Plan!`,
      subscription,
      credits: updatedCredit.amount,
      invoiceUrl,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
