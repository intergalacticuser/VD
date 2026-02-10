import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body?.fileId || !body?.storageKey) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const file = await prisma.file.findFirst({
    where: { id: body.fileId, projectId: params.id }
  });

  if (!file) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (file.storageKey !== body.storageKey) {
    return NextResponse.json({ error: "Storage mismatch" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
