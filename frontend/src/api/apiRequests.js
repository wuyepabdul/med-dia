import axios from "axios";

export const fetchSymptoms = async () => {
  try {
    const result = await axios.get("/api/symptoms");
    return result.data;
  } catch (error) {
    console.log("frontend api error", error.message);
  }
};

export const fetchDiagnosis = async (data) => {
  try {
    const result = await axios.get("/api/diagnosis", { params: { data } });
    return result;
  } catch (error) {
    console.log("frontend api error", error.message);
  }
};

export const fetchSavedDiagnosis = async (data) => {
  try {
    const result = await axios.get("/api/all");
    return result;
  } catch (error) {
    console.log("frontend api error", error.message);
  }
};

export const saveDiagnosisData = async (data) => {
  try {
    const result = await axios.post("/api/newDiagnosis", data);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
