import jwt from "jsonwebtoken";
import Session from "../database/models/session.model.js";
import { JWT_SECRET } from "../config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send({
        status: "FAILED",
        data: { message: "No token, authorization denied" },
      });
    }

    const sessionFound = await Session.findOne({ access_token: token });

    if (!sessionFound) {
      return res
        .status(401)
        .send({ status: "FAILED", data: { message: "Session not found" } });
    }

    jwt.verify(token, JWT_SECRET, (error, authData) => {
      if (error) {
        return res
          .status(401)
          .send({ status: "FAILED", data: { message: "Token is not valid" } });
      }
      req.authData = authData;
      console.log(authData);
      next();
    });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
