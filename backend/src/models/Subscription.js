const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    level: { type: String, enum: ["gratuita", "premium"], required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
