const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    specialities: [{ type: String }],
    subscription: {
      level: { type: String, enum: ["gratuita", "premium"] },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("doctor", doctorSchema);
