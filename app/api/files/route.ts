import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeFile } from "@/lib/serialize";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const files = await prisma.file.findMany({
    where: { project: { userId: session.user.id } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ files: files.map(serializeFile) });
}
