import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const validateTokenMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).send({
        status: "FAILED",
        data: { message: "No token, authorization denied" },
      });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .send({ status: "FAILED", data: { message: "Token is not valid" } });
      }
      console.log(decoded);
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
