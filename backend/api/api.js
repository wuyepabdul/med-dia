const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");

const baseUrl = process.env.API_URL;
const token = process.env.API_TOKEN;

const getSymptoms = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${baseUrl}/symptoms?token=${token}&language=en-gb`,
    });
    return response;
  } catch (error) {
    console.log("api error", error.message);
  }
};

const getDiagnosis = async (data) => {
  try {
    const symptoms = encodeURIComponent(JSON.stringify(data.selectedSymptoms));
    const response = await axios({
      method: "get",
      url: `${baseUrl}/diagnosis?token=${token}&language=en-gb&symptoms=${symptoms}&gender=${data.selectedGender}&year_of_birth=${data.selectedDob}`,
    });
    return response.data;
  } catch (error) {
    console.log("api error", error.message);
  }
};
module.exports = { getSymptoms, getDiagnosis };
