import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation/auth";
import { hashPassword } from "@/lib/passwords";
import { notifyUser } from "@/lib/notifications";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email }
  });

  if (existing && !existing.deletedAt) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);

  const user = await prisma.user.upsert({
    where: { email: parsed.data.email },
    create: {
      email: parsed.data.email,
      name: parsed.data.name,
      phone: parsed.data.phone ?? null,
      passwordHash,
      role: "USER"
    },
    update: {
      name: parsed.data.name,
      phone: parsed.data.phone ?? null,
      passwordHash,
      deletedAt: null,
      anonymizedAt: null,
      isDisabled: false
    }
  });

  await notifyUser({
    userId: user.id,
    type: "WELCOME",
    payload: { email: user.email },
    email: user.email
      ? {
          to: user.email,
          subject: "Welcome to VD Publishing",
          html: "<p>Your VD Publishing account is ready.</p>"
        }
      : undefined
  });

  return NextResponse.json({ ok: true });
}
