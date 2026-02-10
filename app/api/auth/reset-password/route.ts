import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validation/auth";
import { hashPassword, hashToken } from "@/lib/passwords";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const tokenHash = hashToken(parsed.data.token);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash }
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash }
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() }
    }),
    prisma.session.deleteMany({ where: { userId: resetToken.userId } })
  ]);

  return NextResponse.json({ ok: true });
}
