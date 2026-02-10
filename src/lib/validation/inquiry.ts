import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3),
  message: z.string().min(10),
  honeypot: z.string().optional().nullable()
});
