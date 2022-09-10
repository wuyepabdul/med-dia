const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema(
  {
    Accuracy: { type: Number },
    Name: { type: String },
    IcdName: { type: String },
    Icd: { type: String },
    ProfName: { type: String },
    Ranking: { type: Number },
    Valid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
module.exports = Diagnosis;
