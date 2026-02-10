import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { guestUploadSchema } from "@/lib/validation/upload";
import { getPresignedUploadUrl } from "@/lib/s3";
import { MAX_UPLOAD_BYTES } from "@/lib/constants";
import { notifyAdmins } from "@/lib/notifications";

function makeReferenceId() {
  return `VDP-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = guestUploadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (parsed.data.sizeBytes > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const referenceId = makeReferenceId();
  const storageKey = `guest/${referenceId}/${parsed.data.filename}`;
  const uploadUrl = await getPresignedUploadUrl({
    key: storageKey,
    contentType: parsed.data.mimeType || "application/octet-stream"
  });

  await prisma.guestSubmission.create({
    data: {
      referenceId,
      name: parsed.data.name,
      email: parsed.data.email,
      description: parsed.data.description ?? null,
      fileName: parsed.data.filename,
      fileExt: parsed.data.ext,
      fileMime: parsed.data.mimeType,
      sizeBytes: BigInt(parsed.data.sizeBytes),
      storageKey
    }
  });

  await notifyAdmins({
    type: "GUEST_UPLOAD",
    payload: { referenceId, email: parsed.data.email }
  });

  return NextResponse.json({ uploadUrl, referenceId, storageKey });
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body?.referenceId || !body?.storageKey) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const submission = await prisma.guestSubmission.findUnique({
    where: { referenceId: body.referenceId }
  });

  if (!submission) {
    return NextResponse.json({ error: "Unknown reference" }, { status: 404 });
  }

  if (submission.storageKey !== body.storageKey) {
    return NextResponse.json({ error: "Storage mismatch" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
