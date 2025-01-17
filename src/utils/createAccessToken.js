import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function createAccessToken(payload, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: expiresIn,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
