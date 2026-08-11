import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      select: { userId: true },
    });

    if (!session) {
      return NextResponse.json({ error: "Session invalid" }, { status: 401 });
    }

    // Find payment record matching invoice ID or externalId or id
    const payment = await prisma.payment.findFirst({
      where: {
        userId: session.userId,
        OR: [
          { id },
          { externalId: id },
          { invoiceUrl: { contains: id } },
        ],
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    let parsedMeta: any = {};
    if (typeof payment.metadata === "string") {
      try {
        parsedMeta = JSON.parse(payment.metadata);
      } catch {}
    } else if (payment.metadata) {
      parsedMeta = payment.metadata;
    }

    const invoiceData = {
      invoiceId: parsedMeta.invoiceNumber || `INV-${payment.id.slice(-6).toUpperCase()}`,
      date: payment.createdAt,
      customerName: payment.user.name || "Valued Researcher",
      customerEmail: payment.user.email,
      description: payment.description || "ResearchAI Subscription Upgrade",
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      provider: payment.provider,
      orderId: payment.externalId,
      paymentId: parsedMeta.paymentId || payment.externalId,
    };

    return NextResponse.json({ invoice: invoiceData });
  } catch (error) {
    console.error("Fetch invoice error:", error);
    return NextResponse.json({ error: "Failed to generate invoice" }, { status: 500 });
  }
}
