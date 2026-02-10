import { prisma } from "./db";
import { queueEmail } from "./email";

export async function notifyUser(params: {
  userId: string;
  type: string;
  payload: Record<string, unknown>;
  email?: { to: string; subject: string; html: string; text?: string };
}): Promise<void> {
  await prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      payload: params.payload
    }
  });

  if (params.email) {
    await queueEmail({
      to: params.email.to,
      subject: params.email.subject,
      html: params.email.html,
      text: params.email.text,
      requestedById: params.userId
    });
  }
}

export async function notifyAdmins(params: {
  type: string;
  payload: Record<string, unknown>;
  email?: { subject: string; html: string; text?: string };
}): Promise<void> {
  const admins = await prisma.user.findMany({ where: { role: "ADMIN", deletedAt: null, isDisabled: false } });

  if (admins.length === 0) return;

  await prisma.notification.createMany({
    data: admins.map((admin) => ({
      userId: admin.id,
      type: params.type,
      payload: params.payload
    }))
  });

  if (params.email) {
    await Promise.all(
      admins
        .filter((admin) => admin.email)
        .map((admin) =>
          queueEmail({
            to: admin.email ?? "",
            subject: params.email!.subject,
            html: params.email!.html,
            text: params.email!.text,
            requestedById: admin.id
          })
        )
    );
  }
}
