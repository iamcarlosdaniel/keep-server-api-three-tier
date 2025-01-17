import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const validateToken = async (token) => {
  if (!token) {
    throw new Error("No token, authorization denied");
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      throw new Error("Token is not valid");
    }
    return decoded;
  });
};
