import { z } from "zod";
import { ProjectStatus } from "@prisma/client";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional().nullable()
});

export const updateProjectStatusSchema = z.object({
  status: z.nativeEnum(ProjectStatus)
});
