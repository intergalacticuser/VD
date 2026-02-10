import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { presignSchema } from "@/lib/validation/upload";
import { getPresignedUploadUrl } from "@/lib/s3";
import { MAX_UPLOAD_BYTES } from "@/lib/constants";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = presignSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (parsed.data.sizeBytes > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id }
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const storageKey = `projects/${project.id}/${Date.now()}-${parsed.data.filename}`;
  const uploadUrl = await getPresignedUploadUrl({
    key: storageKey,
    contentType: parsed.data.mimeType
  });

  const file = await prisma.file.create({
    data: {
      projectId: project.id,
      uploadedByUserId: session.user.id,
      originalName: parsed.data.filename,
      mimeType: parsed.data.mimeType,
      ext: parsed.data.ext,
      sizeBytes: BigInt(parsed.data.sizeBytes),
      storageKey,
      storageProvider: "S3"
    }
  });

  return NextResponse.json({ uploadUrl, fileId: file.id, storageKey });
}
