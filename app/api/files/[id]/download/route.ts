import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPresignedDownloadUrl } from "@/lib/s3";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const file = await prisma.file.findFirst({
    where:
      session.user.role === "ADMIN"
        ? { id: params.id }
        : {
            id: params.id,
            project: {
              userId: session.user.id
            }
          }
  });

  if (!file) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const url = await getPresignedDownloadUrl({ key: file.storageKey });
  return NextResponse.json({ url });
}
