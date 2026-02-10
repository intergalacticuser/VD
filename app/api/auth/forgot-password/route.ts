import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validation/auth";
import { createResetToken } from "@/lib/passwords";
import { queueEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email }
  });

  if (user && !user.deletedAt) {
    const { token, tokenHash, expiresAt } = createResetToken();

    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt
      }
    });

    const appUrl = process.env.APP_URL ?? "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    await queueEmail({
      to: user.email ?? parsed.data.email,
      subject: "Reset your VD Publishing password",
      html: `<p>Reset your password: <a href=\"${resetUrl}\">${resetUrl}</a></p>`
    });
  }

  return NextResponse.json({ ok: true });
}
