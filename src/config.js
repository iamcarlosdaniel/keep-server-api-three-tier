import "dotenv/config";

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CLIENT_URL = process.env.CLIENT_URL;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
