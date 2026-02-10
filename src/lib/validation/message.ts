import { z } from "zod";

export const createMessageSchema = z.object({
  body: z.string().min(2)
});
