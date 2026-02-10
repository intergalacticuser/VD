import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updatePasswordSchema } from "@/lib/validation/account";
import { hashPassword, verifyPassword } from "@/lib/passwords";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updatePasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.passwordHash) {
    return NextResponse.json({ error: "Password not set" }, { status: 400 });
  }

  const ok = await verifyPassword(parsed.data.currentPassword, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash }
  });

  return NextResponse.json({ ok: true });
}
