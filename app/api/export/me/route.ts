import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeFile } from "@/lib/serialize";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [user, projects, files, threads, inquiries] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.project.findMany({ where: { userId } }),
    prisma.file.findMany({ where: { project: { userId } } }),
    prisma.messageThread.findMany({ where: { project: { userId } }, include: { messages: true } }),
    prisma.inquiry.findMany({ where: { userId } })
  ]);

  return NextResponse.json(
    { user, projects, files: files.map(serializeFile), threads, inquiries },
    { headers: { "Content-Disposition": "attachment; filename=vd-publishing-export.json" } }
  );
}
