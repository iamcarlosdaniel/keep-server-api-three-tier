import jwt from "jsonwebtoken";

import Session from "../database/models/session.model.js";

import UserError from "../errors/user.error.js";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const auth_token =
      req.cookies.auth_token ||
      (req.headers["authorization"] &&
      req.headers["authorization"].startsWith("Bearer ")
        ? req.headers["authorization"].split("Bearer ")[1].trim()
        : null);

    if (!auth_token) {
      throw new UserError(401, "No token, authorization denied.");
    }

    const sessionFound = await Session.findOne({ auth_token: auth_token });

    if (!sessionFound) {
      throw new UserError(401, "Session not found.");
    }

    jwt.verify(auth_token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        throw new UserError(401, "Token is not valid.");
      }

      req.authData = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};
