const { getSymptoms, getDiagnosis, getAccessToken } = require("../api/api");
const Diagnosis = require("../models/DiagnosisModel");
const dotenv = require("dotenv");
dotenv.config();

const api_auth = process.env.API_AUTH;

const getAccessTokenController = async (req, res) => {
  try {
    const token = await getAccessToken();
    const data = await token.post(`${api_auth}`);
    return data.data;
    
  } catch (error) {
    console.log("error", error.message);
  }
};

const getSymptomsController = async (req, res) => {
  try {
    const token = await getAccessTokenController();
    const symptoms = await getSymptoms(token.Token);
    res.json(symptoms.data);
  } catch (error) {
    console.log("error", error.message);
  }
};

// getDiagnosis

const getDiagnosisController = async (req, res) => {
  try {
    const token = await getAccessTokenController();
    const { selectedSymptoms, selectedDob, selectedGender } = JSON.parse(
      req.query.data
    );
    const data = { selectedSymptoms, selectedDob, selectedGender };
    const diagnosis = await getDiagnosis(data, token.Token);
    res.json(diagnosis);
  } catch (error) {
    console.log("error", error.message);
  }
};

const saveDiagnosisController = async (req, res) => {
  try {
    const { Accuracy, Ranking, Icd, IcdName, Name, ProfName, Validity } =
      req.body;
    if (
      Name.length !== 0 &&
      Accuracy !== 0 &&
      ProfName.length !== 0 &&
      IcdName.length !== 0 &&
      Icd.length !== 0 &&
      Ranking !== 0
    ) {
      const diagnosis = new Diagnosis({
        Accuracy,
        Ranking,
        Icd,
        IcdName,
        Name,
        ProfName,
        Valid: Validity && Validity,
      });
      const savedDiagnosis = await diagnosis.save();
      if (savedDiagnosis) {
        res.status(201).json({ message: "Diagnosis Saved Successfully" });
      }
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: "An Error occured try again later" });
  }
};

const getAllDiagnosis = async (req, res) => {
  try {
    const diagnosis = await Diagnosis.find({});
    res.json({ data: diagnosis });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: "An Error occured try again later" });
  }
};

module.exports = {
  getSymptomsController,
  getDiagnosisController,
  saveDiagnosisController,
  getAllDiagnosis,
  getAccessTokenController,
};
