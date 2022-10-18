const express = require("express");
const {
  getSymptomsController,
  getDiagnosisController,
  saveDiagnosisController,
  getAllDiagnosis,
  getAccessTokenController,
} = require("../controllers/diagnosisController");

const router = express.Router();

router.post("/auth", getAccessTokenController);

router.get("/all", getAllDiagnosis);

router.get("/symptoms", getSymptomsController);

router.get("/diagnosis", getDiagnosisController);

router.post("/newDiagnosis", saveDiagnosisController);

module.exports = router;
