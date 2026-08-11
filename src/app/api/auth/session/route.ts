import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { seedDatabase } from "@/lib/db-seed";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await seedDatabase();
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
            researchAreas: true,
            onboardingCompleted: true,
            profile: true,
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
      if (session) {
        await prisma.session.delete({ where: { sessionToken } }).catch(() => {});
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
      await prisma.session.deleteMany({ where: { sessionToken } }).catch(() => {});
      cookieStore.delete("session-token");
    }

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logged out" });
  }
}
