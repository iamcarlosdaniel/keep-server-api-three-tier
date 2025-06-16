import { z } from "zod";

export const signUpSchema = z
  .object({
    first_name: z
      .string({ required_error: "First name is required." })
      .min(2, { message: "First name must be at least 2 characters long." })
      .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
        message:
          "First name must start with an uppercase letter, and each word must begin with an uppercase letter followed by lowercase letters.",
      })
      .trim(),

    last_name: z
      .string({ required_error: "Last name is required." })
      .min(2, { message: "Last name must be at least 2 characters long." })
      .regex(/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/, {
        message:
          "Last name must start with an uppercase letter, and each word must begin with an uppercase letter followed by lowercase letters.",
      })
      .trim(),

    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email must be a valid email address." })
      .trim(),

    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character.",
      })
      .trim(),

    confirm_password: z
      .string({ required_error: "Confirmation password is required." })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      })
      .trim(),
  })
  .strict()
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

export const confirmAccountSchema = z
  .object({
    user_id: z.string({ required_error: "User ID is required." }),
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email must be a valid email address." }),
    otp: z.string({ required_error: "Verification code is required." }),
  })
  .strict();

export const signInSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email must be a valid email address." })
      .trim(),

    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .trim(),
  })
  .strict();

export const forgotPasswordSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email must be a valid email address." }),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Email must be a valid email address." }),
    otp: z.string({ required_error: "Verification code is required." }),
    new_password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character.",
      }),
    confirm_password: z
      .string({ required_error: "Confirmation password is required." })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      }),
  })
  .strict()
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });
