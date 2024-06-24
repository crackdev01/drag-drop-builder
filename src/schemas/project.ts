import { z } from "zod";

export type ProjectSchema = z.infer<typeof projectSchema>;

export const projectSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string().min(4).optional(),
});
