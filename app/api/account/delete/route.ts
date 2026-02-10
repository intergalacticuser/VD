import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        anonymizedAt: new Date(),
        email: null,
        name: "Deleted User",
        phone: null,
        passwordHash: null,
        isDisabled: true
      }
    }),
    prisma.session.deleteMany({ where: { userId } }),
    prisma.account.deleteMany({ where: { userId } })
  ]);

  await writeAuditLog({
    actorUserId: userId,
    action: "ACCOUNT_DELETED",
    entityType: "User",
    entityId: userId,
    metadata: {}
  });

  return NextResponse.json({ ok: true });
}
