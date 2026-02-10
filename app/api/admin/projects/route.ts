import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProjectStatus } from "@prisma/client";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get("status");

  const status = statusParam && Object.values(ProjectStatus).includes(statusParam as ProjectStatus)
    ? (statusParam as ProjectStatus)
    : undefined;

  const projects = await prisma.project.findMany({
    where: status ? { status } : undefined,
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ projects });
}
