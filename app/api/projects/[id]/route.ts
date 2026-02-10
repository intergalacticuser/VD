import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeFile } from "@/lib/serialize";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = await prisma.project.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { files: true }
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    project: {
      ...project,
      files: project.files.map(serializeFile)
    }
  });
}
