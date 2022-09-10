import React, { useEffect, useState } from "react";
import { fetchSavedDiagnosis } from "../api/apiRequests";
import { loadingSpinner } from "../helpers/spinner";

const DiagnosisValidity = () => {
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    getDiagnosis();
  }, []);

  const getDiagnosis = async () => {
    try {
      const response = await fetchSavedDiagnosis();
      if (response) {
        setDiagnosis(response.data);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row py-2">
        <div className="col-md-6">
          <h3 className="text-center">Valid Diagnosis</h3>
          {diagnosis
            ? diagnosis.data
                .filter((item) => item.Valid === true)
                .map((item) => (
                  <div className="mb-3 border border-primary border-1 p-3">
                    <div>
                      <p>Accuracy - {item.Accuracy}</p>
                      <p>Name - {item.Name}</p>
                      <p>ProfName - {item.ProfName} </p>
                      <p> IcdName - {item.IcdName}</p>
                      <p>Icd: {item.Icd} </p>
                      <p>Ranking : {item.Ranking} </p>
                      <p>Valid : {item.Valid && "true"} </p>
                    </div>
                  </div>
                ))
            : loadingSpinner()}
        </div>
        <div className="col-md-6">
          <h3 className="text-center">InValid Diagnosis</h3>
          {diagnosis
            ? diagnosis.data
                .filter((item) => item.Valid === false)
                .map((item) => (
                  <div className="mb-3 border border-primary border-1 p-3">
                    <div>
                      <p>Accuracy - {item.Accuracy}</p>
                      <p>Name - {item.Name}</p>
                      <p>ProfName - {item.ProfName} </p>
                      <p> IcdName - {item.IcdName}</p>
                      <p>Icd: {item.Icd} </p>
                      <p>Ranking {item.Ranking} </p>
                      <p>Valid : {!item.Valid && "false"} </p>
                    </div>
                  </div>
                ))
            : loadingSpinner()}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisValidity;
