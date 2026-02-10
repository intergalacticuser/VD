import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createMessageSchema } from "@/lib/validation/message";
import { notifyAdmins } from "@/lib/notifications";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id }
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
      senderRole: session.user.role === "ADMIN" ? "ADMIN" : "USER",
      body: parsed.data.body
    }
  });

  await notifyAdmins({
    type: "NEW_MESSAGE",
    payload: { projectId: project.id, messageId: message.id },
    email: {
      subject: "New project message",
      html: `<p>New message for project ${project.title}.</p>`
    }
  });

  return NextResponse.json({ message });
}
