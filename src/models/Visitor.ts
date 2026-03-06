import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ipHash: {
      type: String,
      required: true,
      unique: true,
    },
    visits: {
      type: Number,
      default: 1,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Visitor = mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);
