import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            userType: true,
            onboardingCompleted: true,
            creditBalance: {
              select: { amount: true },
            },
            subscription: {
              include: { plan: true },
            },
          },
        },
      },
    });

    if (!session || session.expires < new Date()) {
      // Clean up expired session
      if (session) {
        await prisma.session.delete({ where: { sessionToken } });
      }
      cookieStore.delete("session-token");
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: session.user });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session-token")?.value;

    if (sessionToken) {
      await prisma.session.deleteMany({ where: { sessionToken } });
      cookieStore.delete("session-token");
    }

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logged out" });
  }
}
