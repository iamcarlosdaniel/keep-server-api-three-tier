import { Router } from "express";

import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware.js";

import {
  signUpSchema,
  signInSchema,
} from "../../database/schemas/auth.schema.js";

import authController from "../../controllers/auth.controller.js";

const router = Router();

router.post(
  "/sign-up",
  inputValidationMiddleware(signUpSchema),
  authController.signUp
);

router.post("/sign-up/otp/resend", authController.resendOTP);

router.post("/sign-up/confirm", authController.confirmAccount);

router.post(
  "/sign-in",
  inputValidationMiddleware(signInSchema),
  authController.signIn
);

router.post("/password/forgot", authController.forgotPassword);

router.post("/password/reset", authController.resetPassword);

router.get("/status", authenticationMiddleware, authController.authStatus);

router.post("/sign-out", authController.signOut);

export default router;
