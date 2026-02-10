import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body?.title || !body?.body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.contentBlock.update({
    where: { id: params.id },
    data: { title: body.title, body: body.body }
  });

  await writeAuditLog({
    actorUserId: session.user.id,
    action: "ADMIN_CONTENT_UPDATE",
    entityType: "ContentBlock",
    entityId: params.id,
    metadata: { title: body.title }
  });

  return NextResponse.json({ ok: true });
}
