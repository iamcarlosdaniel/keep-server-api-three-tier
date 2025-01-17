import authService from "../services/auth.service.js";

class AuthController {
  async confirmEmail(req, res) {
    try {
      const email = req.body.email;
      const response = await authService.confirmEmail(email);
      res.status(200).send({
        status: "OK",
        data: {
          message: response,
        },
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: {
          error: [
            {
              message:
                error?.message ||
                "An error occurred while sending the email. Please try again later.",
            },
          ],
        },
      });
    }
  }

  async signUp(req, res) {
    try {
      const userData = req.body;
      const confirmedEmail = req.decoded.email;
      const { token } = await authService.signUp(userData, confirmedEmail);

      res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      });

      res.status(200).send({
        status: "OK",
        data: {
          message:
            "Congratulations! Your account has been successfully created.",
        },
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error?.message || error }] },
      });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const { token } = await authService.signIn(email, password);

      res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).send({
        status: "OK",
        data: { message: "Login successful. Welcome back!" },
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error?.message || error }] },
      });
    }
  }

  async signOut(req, res) {
    try {
      const { token } = req.cookies.token;

      await authService.signOut(token);

      res.clearCookie("auth_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).send({
        status: "OK",
        data: { message: "Sign out successfully" },
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error?.message || error }] },
      });
    }
  }

  async authStatus(req, res) {
    try {
      const authUser = await authService.authStatus(req.authData.id);

      res.status(200).send({
        status: "OK",
        data: { message: "Authenticated", user: authUser },
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error?.message || error }] },
      });
    }
  }

  async forgotPassword(req, res) {
    try {
      const message = await authService.forgotPassword(req.body.email);
      res.status(200).send({
        status: "OK",
        data: message,
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error?.message || error }] },
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const userData = req.body;
      const confirmedEmail = req.email.email;

      const message = await authService.resetPassword(userData, confirmedEmail);
      res.status(200).send({
        status: "OK",
        data: message,
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: [{ message: error?.message || error }] },
      });
    }
  }
}

export default new AuthController();
