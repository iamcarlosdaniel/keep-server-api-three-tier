import jwt from "jsonwebtoken";

export function createAccessToken(payload, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
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
