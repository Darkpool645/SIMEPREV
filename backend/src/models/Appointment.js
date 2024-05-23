const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    pacient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pacient",
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    clinc_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clinic",
      required: true,
    },
    date: { type: Date, required: true },
    reason: { type: String },
    diagnostic: { type: String, required: true },
    treatment: { type: String },
    severity: { type: String, required: true, enum: ["baja", "media", "alta"] },
    qr_image: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pendiente", "completada", "cancelada"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", appointmentSchema);
