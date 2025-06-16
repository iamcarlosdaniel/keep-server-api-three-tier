import { z } from "zod";

export const noteSchema = z
  .object({
    title: z.string().trim().optional(),
    body: z.string({ required_error: "Note body is required." }).trim(),
  })
  .strict();
