import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session-token")?.value;
  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: {
      user: {
        include: {
          profile: true,
          subscription: { include: { plan: true } },
          creditBalance: true,
        },
      },
    },
  });

  if (!session || session.expires < new Date()) return null;
  return session.user;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user profile error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      userType,
      researchAreas,
      onboardingCompleted,
      institution,
      department,
      bio,
      website,
      linkedin,
      twitter,
      googleScholar,
      orcid,
      isPublic,
    } = body;

    // Build update user data
    const userUpdateData: any = {};
    if (name !== undefined) userUpdateData.name = name;
    if (userType !== undefined) userUpdateData.userType = userType;
    if (researchAreas !== undefined) {
      userUpdateData.researchAreas = typeof researchAreas === "string" ? researchAreas : JSON.stringify(researchAreas);
    }
    if (onboardingCompleted !== undefined) userUpdateData.onboardingCompleted = Boolean(onboardingCompleted);

    // Update user
    if (Object.keys(userUpdateData).length > 0) {
      await prisma.user.update({
        where: { id: currentUser.id },
        data: userUpdateData,
      });
    }

    // Upsert profile data
    const profileData: any = {};
    if (institution !== undefined) profileData.institution = institution;
    if (department !== undefined) profileData.department = department;
    if (bio !== undefined) profileData.bio = bio;
    if (website !== undefined) profileData.website = website;
    if (linkedin !== undefined) profileData.linkedin = linkedin;
    if (twitter !== undefined) profileData.twitter = twitter;
    if (googleScholar !== undefined) profileData.googleScholar = googleScholar;
    if (orcid !== undefined) profileData.orcid = orcid;
    if (isPublic !== undefined) profileData.isPublic = Boolean(isPublic);

    const updatedProfile = await prisma.profile.upsert({
      where: { userId: currentUser.id },
      update: profileData,
      create: {
        userId: currentUser.id,
        ...profileData,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        profile: true,
        creditBalance: { select: { amount: true } },
        subscription: { include: { plan: true } },
      },
    });

    return NextResponse.json({
      user: updatedUser,
      profile: updatedProfile,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
