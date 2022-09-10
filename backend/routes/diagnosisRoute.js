const express = require("express");
const {
  getSymptomsController,
  getDiagnosisController,
  saveDiagnosisController,
  getAllDiagnosis,
} = require("../controllers/diagnosisController");

const router = express.Router();

router.get("/all", getAllDiagnosis);

router.get("/symptoms", getSymptomsController);

router.get("/diagnosis", getDiagnosisController);

router.post("/newDiagnosis", saveDiagnosisController);

module.exports = router;
