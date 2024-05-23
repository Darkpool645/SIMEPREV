const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: ["paciente", "doctor", "administrador"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
