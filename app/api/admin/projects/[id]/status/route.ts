import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateProjectStatusSchema } from "@/lib/validation/project";
import { notifyUser } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = updateProjectStatusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: { status: parsed.data.status },
    include: { user: true }
  });

  await notifyUser({
    userId: project.userId,
    type: "PROJECT_STATUS",
    payload: { projectId: project.id, status: project.status },
    email: project.user?.email
      ? {
          to: project.user.email,
          subject: "Project status updated",
          html: `<p>Your project ${project.title} status is now ${project.status}.</p>`
        }
      : undefined
  });

  await writeAuditLog({
    actorUserId: session.user.id,
    action: "ADMIN_PROJECT_STATUS_UPDATE",
    entityType: "Project",
    entityId: project.id,
    metadata: { status: project.status }
  });

  return NextResponse.json({ ok: true });
}
