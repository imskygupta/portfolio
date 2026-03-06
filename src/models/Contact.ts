import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true, // They only get saved if verified through OTP
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

// Temporary OTP memory store for simplicity since it's a portfolio
// In production, redis or a DB collection is better.
const OTPSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: '5m', default: Date.now }
});

export const OTP = mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
