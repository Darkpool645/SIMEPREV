const mongoose = require("mongoose");

const pacientSchema = new mongoose.Schema(
  {
    age: { type: Number, requried: true },
    gender: { type: String, enum: ["masculino", "femenino"], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    medical_history: {
      preconditions: [{ type: String }],
      surgeries: [
        {
          type: { type: String },
          date: { type: Date },
        },
      ],
      allergies: [{ type: String }],
      family_history: [{ type: String }],
    },
    medicines: [
      {
        name: { type: String },
        dosis: { type: String },
        frecuency: { type: String },
      },
    ],
    vaccines: [
      {
        name: { type: String },
        date: { type: Date },
      },
    ],
    lifestyle: {
      diet: { type: String, required: true },
      smoke: { type: Boolean, required: true },
      alcohol: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pacient", pacientSchema);
