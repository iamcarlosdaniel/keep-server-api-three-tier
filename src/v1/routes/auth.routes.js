import { Router } from "express";
import authController from "../../controllers/auth.controller.js";
import { validateTokenMiddleware } from "../../middlewares/validateToken.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware.js";
import { authValidation } from "../../database/schemas/auth.schema.js";

const router = Router();

router.post("/confirm-email", authController.confirmEmail);

//Sign up
router.post(
  "/sign-up",
  validateTokenMiddleware,
  inputValidationMiddleware(authValidation.signUpSchema),
  authController.signUp
);

//Sign in
router.post(
  "/sign-in",
  inputValidationMiddleware(authValidation.signInSchema),
  authController.signIn
);

//Sign out
router.post("/sign-out", authController.signOut);

//Get auth status
router.get("/status", authMiddleware, authController.authStatus);

//Forgot password
router.post("/forgot-password", authController.forgotPassword);

//Reset password
router.post(
  "/reset-password",
  validateTokenMiddleware,
  authController.resetPassword
);

export default router;
