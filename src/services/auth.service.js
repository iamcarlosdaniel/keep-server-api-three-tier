import bcrypt from "bcryptjs";

import User from "../database/models/user.model.js";
import Session from "../database/models/session.model.js";

import { createAccessToken } from "../utils/jwt.utils.js";
import { sendEmail } from "../utils/sendEmail.utils.js";
import { createOTP } from "../utils/otp.utils.js";

import UserError from "../errors/user.error.js";

class AuthService {
  async signUp(userData) {
    const userFoundByEmail = await User.findOne({
      email: userData.email,
    });

    if (userFoundByEmail) {
      throw new UserError(
        409,
        "The email address provided is already in use. Please use another email address."
      );
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);
    const { otp, expireAt } = await createOTP(100000, 999999, 3);

    await User.create({
      ...userData,
      password: passwordHash,
      email_verify_otp: otp,
      email_verify_otp_expire_at: expireAt,
      is_email_verified: false,
    });

    const context = {
      url: process.env.CLIENT_URL,
      otp: otp,
    };

    await sendEmail(
      userData.email,
      "Confirm your account",
      "confirmAccountTemplate",
      context
    );

    return {
      message: `Confirmation email successfully sent to ${userData.email}.`,
      data: { email: userData.email },
    };
  }

  async resendOTP(email) {
    const userFound = await User.findOne({ email: email });

    if (!userFound) {
      throw new UserError(
        404,
        "The email address provided is not associated with any registered user."
      );
    }

    if (userFound.is_email_verified) {
      throw new UserError(
        409,
        "The email address provided is already verified. No need to resend the OTP."
      );
    }

    const { otp, expireAt } = await createOTP(100000, 999999, 3);

    await User.findOneAndUpdate(
      { email },
      {
        email_verify_otp: otp,
        email_verify_otp_expire_at: expireAt,
      }
    );

    const context = {
      url: process.env.CLIENT_URL,
      otp: otp,
    };

    await sendEmail(
      email,
      "Confirm your account",
      "confirmAccountTemplate",
      context
    );

    return {
      message: `New confirmation code sent successfully to ${email}.`,
    };
  }

  async confirmAccount(email, otp) {
    const userFound = await User.findOne({ email: email });

    if (userFound.is_email_verified) {
      throw new UserError(
        409,
        "The email address provided is already verified."
      );
    }

    if (!userFound) {
      throw new UserError(
        404,
        "The user associated with the account could not be found."
      );
    }

    if (userFound.email_verify_otp !== otp) {
      throw new UserError(
        401,
        "The verification code provided is incorrect. Please check the code and try again."
      );
    }

    if (Date.now() > userFound.email_verify_otp_expire_at) {
      throw new UserError(
        401,
        "The verification code has expired. Please request a new one."
      );
    }

    await User.findOneAndUpdate(
      { email },
      {
        is_email_verified: true,
        email_verify_otp: null,
        email_verify_otp_expire_at: null,
      }
    );

    const context = {
      url: process.env.CLIENT_URL,
    };

    await sendEmail(email, "Welcome to Keep", "welcomeTemplate", context);

    return { message: "Account successfully verified." };
  }

  async signIn(email, password) {
    const userFound = await User.findOne({
      email,
      is_email_verified: true,
    });

    if (!userFound) {
      throw new UserError(
        404,
        "The email provided is not associated with any registered user. Please check the email and try again."
      );
    }

    const isMarched = await bcrypt.compare(password, userFound.password);

    if (!isMarched) {
      throw new UserError(401, "The password is incorrect. Please try again.");
    }

    const authToken = await createAccessToken(
      {
        id: userFound._id,
        username: userFound.username,
      },
      "7d"
    );

    await Session.create({
      user_id: userFound._id,
      auth_token: authToken,
    });

    return {
      message: `Welcome back, ${userFound.first_name}.`,
      data: { authToken },
    };
  }

  async forgotPassword(email) {
    const userFound = await User.findOne({
      email: email,
    });

    if (!userFound) {
      throw new UserError(404, "Please verify the provided email address.");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expireAt = Date.now() + 15 * 60 * 1000;

    await User.findOneAndUpdate(
      { email },
      {
        password_reset_otp: otp,
        password_reset_otp_expire_at: expireAt,
      }
    );

    const context = {
      domain: process.env.CLIENT_URL,
      otp: otp,
    };

    await sendEmail(
      email,
      "Recover your password",
      "forgotPasswordTemplate",
      context
    );

    return {
      message: `Password recovery email successfully sent to ${email}.`,
    };
  }

  async resetPassword(email, otp, newPassword) {
    const userFound = await User.findOne({
      email: email,
    });

    console.log(userFound);

    if (!userFound) {
      throw new UserError(
        404,
        "The email address provided is not associated with any registered user."
      );
    }

    if (userFound.password_reset_otp !== otp) {
      throw new UserError(
        401,
        "The verification code provided is incorrect. Please check the code and try again."
      );
    }

    if (Date.now() > userFound.password_reset_otp_expire_at) {
      throw new UserError(
        401,
        "The verification code has expired. Please request a new one."
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      {
        password: passwordHash,
        password_reset_otp: null,
        password_reset_otp_expire_at: null,
      }
    );

    return {
      message: "Password successfully updated.",
    };
  }

  async authStatus(userId) {
    const userFound = await User.findById(userId).select(
      "_id first_name last_name email"
    );

    return {
      message: "Active session.",
      data: { user: userFound },
    };
  }

  async signOut(authToken) {
    const sessionFound = await Session.findOneAndDelete({
      auth_token: authToken,
    });

    if (!sessionFound) {
      throw new UserError(404, "No active session found.");
    }

    return {
      message: "Session successfully closed.",
    };
  }
}

export default new AuthService();
