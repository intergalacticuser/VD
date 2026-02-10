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
  const status = body?.status;

  if (!status || !["NEW", "IN_PROGRESS", "CLOSED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.inquiry.update({
    where: { id: params.id },
    data: { status }
  });

  await writeAuditLog({
    actorUserId: session.user.id,
    action: "ADMIN_INQUIRY_UPDATE",
    entityType: "Inquiry",
    entityId: params.id,
    metadata: { status }
  });

  return NextResponse.json({ ok: true });
}
