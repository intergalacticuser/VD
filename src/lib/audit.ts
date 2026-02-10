import { prisma } from "./db";
import { Prisma } from "@prisma/client";

export async function writeAuditLog(params: {
  actorUserId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Prisma.InputJsonValue;
  ip?: string | null;
}): Promise<void> {
  await prisma.auditLog.create({
    data: {
      actorUserId: params.actorUserId ?? null,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId ?? null,
      metadata: params.metadata ?? {},
      ip: params.ip ?? null
    }
  });
}
