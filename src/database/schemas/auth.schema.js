import { z } from "zod";

const signUpSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required." })
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(15, { message: "Username cannot exceed 15 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),

    first_name: z
      .string({ required_error: "First name is required." })
      .min(2, { message: "First name must be at least 2 characters long." })
      .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
        message:
          "First name must start with an uppercase letter, and each word must begin with an uppercase letter followed by lowercase letters.",
      }),

    last_name: z
      .string({ required_error: "Last name is required." })
      .min(2, { message: "Last name must be at least 2 characters long." })
      .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
        message:
          "Last name must start with an uppercase letter, and each word must begin with an uppercase letter followed by lowercase letters.",
      }),

    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email must be a valid email address." }),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character.",
      }),

    confirm_password: z
      .string({ required_error: "Confirmation password is required." })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

const signInSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address." }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const authValidation = {
  signUpSchema,
  signInSchema,
};
