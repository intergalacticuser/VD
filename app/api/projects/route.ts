import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createProjectSchema } from "@/lib/validation/project";
import { notifyAdmins } from "@/lib/notifications";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      title: parsed.data.title,
      description: parsed.data.description ?? null
    }
  });

  await notifyAdmins({
    type: "PROJECT_CREATED",
    payload: { projectId: project.id, title: project.title, userId: session.user.id },
    email: {
      subject: "New project created",
      html: `<p>A new project was created: ${project.title}</p>`
    }
  });

  return NextResponse.json({ project });
}
