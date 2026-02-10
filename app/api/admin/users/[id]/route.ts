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
  const role = body?.role;
  const isDisabled = Boolean(body?.isDisabled);

  if (!role || !["USER", "ADMIN"].includes(role)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: params.id },
    data: { role, isDisabled }
  });

  if (isDisabled) {
    await prisma.session.deleteMany({ where: { userId: params.id } });
  }

  await writeAuditLog({
    actorUserId: session.user.id,
    action: "ADMIN_USER_UPDATE",
    entityType: "User",
    entityId: params.id,
    metadata: { role, isDisabled }
  });

  return NextResponse.json({ ok: true });
}
