import User from "../database/models/user.model.js";
import Session from "../database/models/session.model.js";

import bcrypt from "bcryptjs";

import { createAccessToken } from "../utils/createAccessToken.js";
import { sendEmail } from "../utils/sendMail.js";

import { CLIENT_URL } from "../config.js";

class AuthService {
  async confirmEmail(email) {
    const token = await createAccessToken({ email: email }, "15m");
    const context = {
      domain: CLIENT_URL,
      token: token,
    };

    try {
      const response = await sendEmail(
        email,
        "Confirm email",
        "confirmEmailTemplate",
        context
      );
      return { message: response };
    } catch (error) {
      console.log(error);
      throw new Error(
        "An error occurred while sending the email. Please try again later."
      );
    }
  }

  async signUp(userData, confirmedEmail) {
    try {
      const { email, password } = userData;

      if (confirmedEmail !== email) {
        throw new Error("The email is not confirmed");
      }

      const userFound = await User.findOne({ email });

      if (userFound) {
        throw new Error("The email already exists");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        ...userData,
        password: passwordHash,
      });

      const userSaved = await newUser.save();
      const token = await createAccessToken({ id: userSaved._id }, "7d");

      const newSession = new Session({
        user_id: userSaved._id,
        access_token: token,
      });

      await newSession.save();

      const context = {
        domain: CLIENT_URL,
      };

      sendEmail(email, "Welcome to Keep", "welcomeTemplate", context);

      return { user: userSaved, token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signIn(email, password) {
    try {
      const userFound = await User.findOne({ email });

      if (!userFound) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, userFound.password);

      if (!isMatch) {
        throw new Error("Incorrect password");
      }

      const token = await createAccessToken(
        {
          id: userFound._id,
          username: userFound.username,
        },
        "7d"
      );

      const newSession = new Session({
        user_id: userFound._id,
        access_token: token,
      });

      await newSession.save();

      return { user: userFound, token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signOut(token) {
    try {
      await Session.findOneAndDelete({ token });

      return { message: "Sign out successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async authStatus(userId) {
    try {
      const userFound = await User.findById(userId).select(
        "_id username email"
      );
      return userFound;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async forgotPassword(email) {
    try {
      const userFound = await User.findOne({ email: email });

      if (!userFound) {
        throw new Error("User not found");
      }

      const token = await createAccessToken({ email: email }, "15m");

      const context = {
        domain: CLIENT_URL,
        token: token,
      };

      sendEmail(email, "Reset password", "forgotPasswordTemplate", context);

      return { message: "Reset password email sent" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async resetPassword(userData, confirmedEmail) {
    try {
      const { email, password } = userData;

      if (confirmedEmail !== email) {
        throw new Error("The email is not confirmed");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const userUpdated = await User.findByIdAndUpdate(
        { email: email },
        { password: passwordHash },
        { new: true }
      );

      if (!userUpdated) {
        throw new Error("User not found");
      }

      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new AuthService();
