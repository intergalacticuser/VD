import { z } from "zod";
import { ALLOWED_UPLOAD_EXTENSIONS } from "../constants";

export const presignSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().positive(),
  ext: z
    .string()
    .min(1)
    .transform((value) => value.toLowerCase())
    .refine((value) => ALLOWED_UPLOAD_EXTENSIONS.includes(value as never), "Unsupported file extension")
});

export const guestUploadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  description: z.string().optional().nullable(),
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().positive(),
  ext: z
    .string()
    .min(1)
    .transform((value) => value.toLowerCase())
    .refine((value) => ALLOWED_UPLOAD_EXTENSIONS.includes(value as never), "Unsupported file extension")
});
