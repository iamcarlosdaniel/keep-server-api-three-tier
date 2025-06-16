import { z } from "zod";

export const tagSchema = z
  .object({
    title: z.string({ required_error: "Tag title is required." }).trim(),
    description: z.trim().optional(),
  })
  .strict();
