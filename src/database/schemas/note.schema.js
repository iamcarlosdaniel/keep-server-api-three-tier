import { z } from "zod";

export const noteSchema = z
  .object({
    title: z.string().trim().optional(),
    content: z.string({ required_error: "Note content is required." }).trim(),
  })
  .strict();
