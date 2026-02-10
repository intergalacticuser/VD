import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional().nullable()
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
});
