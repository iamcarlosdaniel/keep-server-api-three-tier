import { z } from "zod";

const noteShema = z.object({
  body: z
    .string({ required_error: "Note body is required." })
    .max(100, { message: "Note body cannot exceed 100 characters." }),
});

export const noteValidation = {
  noteShema,
};
