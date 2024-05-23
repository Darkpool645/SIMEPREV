const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: true },
    phone: { type: String, required: true },
    rooms: { type: Number, required: true },
    personal: { type: Number, required: true },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("clinic", clinicSchema);
