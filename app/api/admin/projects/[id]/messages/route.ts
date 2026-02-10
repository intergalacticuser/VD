import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createMessageSchema } from "@/lib/validation/message";
import { notifyUser } from "@/lib/notifications";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { user: true }
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const thread = await prisma.messageThread.upsert({
    where: { projectId: project.id },
    create: { projectId: project.id },
    update: {}
  });

  const message = await prisma.message.create({
    data: {
      threadId: thread.id,
      senderUserId: session.user.id,
      senderRole: "ADMIN",
      body: parsed.data.body
    }
  });

  await notifyUser({
    userId: project.userId,
    type: "ADMIN_MESSAGE",
    payload: { projectId: project.id, messageId: message.id },
    email: project.user?.email
      ? {
          to: project.user.email,
          subject: "New message from VD Publishing",
          html: `<p>You have a new message on project ${project.title}.</p>`
        }
      : undefined
  });

  await writeAuditLog({
    actorUserId: session.user.id,
    action: "ADMIN_PROJECT_MESSAGE",
    entityType: "Project",
    entityId: project.id,
    metadata: { messageId: message.id }
  });

  return NextResponse.json({ message });
}
