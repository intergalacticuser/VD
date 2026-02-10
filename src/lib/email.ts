import nodemailer from "nodemailer";
import { prisma } from "./db";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? 1025);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM ?? "VD Publishing <no-reply@vdpublishing.local>";
const devMode = process.env.EMAIL_DEV_MODE === "true";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: smtpUser ? { user: smtpUser, pass: smtpPass } : undefined
});

export async function queueEmail(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  requestedById?: string | null;
}): Promise<void> {
  await prisma.emailOutbox.create({
    data: {
      toEmail: params.to,
      subject: params.subject,
      htmlBody: params.html,
      textBody: params.text,
      requestedById: params.requestedById ?? null
    }
  });
}

export async function processOutbox(limit = 20): Promise<{ sent: number; failed: number }> {
  const pending = await prisma.emailOutbox.findMany({
    where: { status: "PENDING" },
    take: limit,
    orderBy: { createdAt: "asc" }
  });

  let sent = 0;
  let failed = 0;

  for (const email of pending) {
    try {
      if (devMode) {
        // Dev mode: mark as sent and log payload for inspection.
        // eslint-disable-next-line no-console
        console.log("Email (dev mode):", email.toEmail, email.subject);
      } else {
        await transporter.sendMail({
          from: smtpFrom,
          to: email.toEmail,
          subject: email.subject,
          html: email.htmlBody,
          text: email.textBody ?? undefined
        });
      }

      await prisma.emailOutbox.update({
        where: { id: email.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          attempts: { increment: 1 },
          lastError: null
        }
      });

      sent += 1;
    } catch (error) {
      await prisma.emailOutbox.update({
        where: { id: email.id },
        data: {
          status: "FAILED",
          attempts: { increment: 1 },
          lastError: error instanceof Error ? error.message : "Unknown error"
        }
      });
      failed += 1;
    }
  }

  return { sent, failed };
}
