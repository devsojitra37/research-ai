import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session-token")?.value;
  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: { select: { id: true, role: true } } },
  });

  if (!session || session.expires < new Date()) return null;
  return session.user;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF, DOCX, TXT, or PPTX." },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum allowed size is 50MB." },
        { status: 400 }
      );
    }

    // Save file to uploads directory
    const uploadsDir = path.join(process.cwd(), "uploads", user.id);
    await mkdir(uploadsDir, { recursive: true });

    const fileExtension = path.extname(file.name);
    const storageKey = `${crypto.randomUUID()}${fileExtension}`;
    const filePath = path.join(uploadsDir, storageKey);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create document record
    const document = await prisma.document.create({
      data: {
        userId: user.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        storageKey: `${user.id}/${storageKey}`,
        status: "UPLOADED",
      },
    });

    // Create analysis record (queued)
    await prisma.documentAnalysis.create({
      data: {
        documentId: document.id,
        status: "QUEUED",
      },
    });

    return NextResponse.json(
      {
        document: {
          id: document.id,
          fileName: document.fileName,
          fileSize: document.fileSize,
          status: document.status,
        },
        message: "Document uploaded successfully. AI analysis will begin shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Something went wrong while uploading your document." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const documents = await prisma.document.findMany({
      where: { userId: user.id },
      include: {
        analysis: {
          select: {
            status: true,
            shortSummary: true,
            qualityScore: true,
            keywords: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Documents list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
