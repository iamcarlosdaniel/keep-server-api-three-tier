import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    //** Account or Email Verification**//
    email_verify_otp: {
      type: String,
    },
    email_verify_otp_expire_at: {
      type: Date,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    //** Verification of Password Change Request **//
    password_reset_otp: {
      type: String,
    },
    password_reset_otp_expire_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
