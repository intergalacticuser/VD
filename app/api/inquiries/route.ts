import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquiry";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { queueEmail } from "@/lib/email";
import { notifyAdmins } from "@/lib/notifications";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const session = await auth();

  await prisma.inquiry.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      subject: parsed.data.subject,
      message: parsed.data.message,
      userId: session?.user?.id ?? null
    }
  });

  await notifyAdmins({
    type: "INQUIRY_CREATED",
    payload: { subject: parsed.data.subject, email: parsed.data.email }
  });

  await queueEmail({
    to: parsed.data.email,
    subject: "VD Publishing inquiry received",
    html: "<p>Thanks for contacting VD Publishing. We will respond shortly.</p>"
  });

  return NextResponse.json({ ok: true });
}
