import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

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

    const { planSlug, billingCycle = "monthly" } = await req.json();

    if (!planSlug) {
      return NextResponse.json({ error: "Plan slug is required" }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({
      where: { slug: planSlug },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const isYearly = billingCycle === "yearly";
    const amountInRupees = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

    if (amountInRupees <= 0) {
      return NextResponse.json({ error: "Free plan does not require checkout" }, { status: 400 });
    }

    const amountInPaise = amountInRupees * 100;
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId: string;
    let isMock = false;

    if (keyId && keySecret && keyId !== "your-razorpay-key-id") {
      // Real Razorpay API call
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: plan.currency,
          receipt: `rcpt_${Date.now()}`,
          notes: {
            userId: session.user.id,
            planSlug: plan.slug,
            billingCycle,
          },
        }),
      });

      if (!rzpRes.ok) {
        const errData = await rzpRes.json();
        console.error("Razorpay API error:", errData);
        return NextResponse.json(
          { error: errData.error?.description || "Failed to create Razorpay order" },
          { status: 500 }
        );
      }

      const rzpOrder = await rzpRes.json();
      razorpayOrderId = rzpOrder.id;
    } else {
      // Demo / Test Mode order generation
      isMock = true;
      razorpayOrderId = `order_mock_${Math.random().toString(36).substring(2, 12)}`;
    }

    // Save pending payment record in DB
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: amountInRupees,
        currency: plan.currency,
        status: "PENDING",
        provider: "razorpay",
        externalId: razorpayOrderId,
        description: `${plan.name} Plan (${billingCycle})`,
        metadata: JSON.stringify({
          planId: plan.id,
          planSlug: plan.slug,
          billingCycle,
          isMock,
        }),
      },
    });

    return NextResponse.json({
      orderId: razorpayOrderId,
      amount: amountInPaise,
      currency: plan.currency,
      keyId: keyId || "rzp_test_mock_key",
      isMock,
      planName: plan.name,
      paymentId: payment.id,
    });
  } catch (error) {
    console.error("Payment order creation error:", error);
    return NextResponse.json({ error: "Something went wrong creating order" }, { status: 500 });
  }
}
