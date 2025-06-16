import authService from "../services/auth.service.js";

import { catchedAsync } from "../utils/catchedAsync.utils.js";

class AuthController {
  signUp = catchedAsync(async (req, res) => {
    const userData = req.body;
    const response = await authService.signUp(userData);

    res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });

  resendOTP = catchedAsync(async (req, res) => {
    const { email } = req.body;
    const response = await authService.resendOTP(email);

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });

  confirmAccount = catchedAsync(async (req, res) => {
    const { email, otp } = req.body;
    const response = await authService.confirmAccount(email, otp);

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });

  signIn = catchedAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.signIn(email, password);

    res.cookie("auth_token", response.data.authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });

  forgotPassword = catchedAsync(async (req, res) => {
    const { email } = req.body;
    const response = await authService.forgotPassword(email);

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });

  resetPassword = catchedAsync(async (req, res) => {
    const { email, otp, new_password } = req.body;
    const response = await authService.resetPassword(email, otp, new_password);

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });

  authStatus = catchedAsync(async (req, res) => {
    const userId = req.authData.id;
    const response = await authService.authStatus(userId);

    res.status(200).send({
      status: "OK",
      message: response.message,
      data: response.data,
    });
  });

  signOut = catchedAsync(async (req, res) => {
    const authToken =
      req.cookies?.auth_token || req.headers["authorization"]?.split(" ")[1];
    const response = await authService.signOut(authToken);

    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).send({
      status: "OK",
      message: response.message,
    });
  });
}

export default new AuthController();
