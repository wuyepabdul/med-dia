import React, { useEffect, useState } from "react";
import { saveDiagnosisData } from "../api/apiRequests";

const Diagnosis = (props) => {
  const localStorageDiagnosis = localStorage.getItem("diagnosisData")
    ? JSON.parse(localStorage.getItem("diagnosisData"))
    : null;

  const [propsData, setPropsData] = useState([]);

  useEffect(() => {
    if (localStorageDiagnosis) {
      setPropsData(localStorageDiagnosis);
    } else {
      setPropsData(props.data);
    }
  }, []);

  let componentName = "";
  let componentAccuracy = 0;
  let componentProfName = "";
  let componentIcdName = "";
  let componentIcd = "";
  let componentRanking = 0;

  const [validity, setValidity] = useState(false);

  const organizeDiagnosisData = async (data, validityState) => {
    try {
      componentName = data.Name;
      componentAccuracy = data.Accuracy;
      componentIcd = data.Icd;
      componentIcdName = data.IcdName;
      componentProfName = data.ProfName;
      componentRanking = data.Ranking;

      const diagnosisData = {
        Name: componentName,
        Accuracy: componentAccuracy,
        ProfName: componentProfName,
        IcdName: componentIcdName,
        Icd: componentIcd,
        Ranking: componentRanking,
        Validity: validityState,
      };

      if (
        componentName.length !== 0 &&
        componentAccuracy !== 0 &&
        componentProfName.length !== 0 &&
        componentIcdName.length !== 0 &&
        componentIcd.length !== 0 &&
        componentRanking !== 0
      ) {
        await saveDiagnosisData(diagnosisData);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const onValidateClick = (data) => {
    const validityState = true;
    organizeDiagnosisData(data, validityState);
  };

  const onInValidateClick = (data) => {
    const validityState = false;
    organizeDiagnosisData(data, validityState);
  };

  return (
    <div>
      {propsData.length > 0 &&
        propsData.map((item) => (
          <form key={item.Issue.ID}>
            <div className="mb-3 border border-primary border-1 p-3">
              <div>
                <p>Accuracy - {item.Issue.Accuracy}</p>
                <p>Name - {item.Issue.Name}</p>
                <p>ProfName - {item.Issue.ProfName} </p>
                <p> IcdName - {item.Issue.IcdName}</p>
                <p>Icd: {item.Issue.Icd} </p>
                <p>Ranking {item.Issue.Ranking} </p>
              </div>
              <div className="d-flex justify-content-around">
                <div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => {
                      e.preventDefault();
                      setValidity(true);
                      onValidateClick(item.Issue, validity);
                    }}
                  >
                    Valid
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setValidity(false);
                      onInValidateClick(item.Issue, validity);
                    }}
                  >
                    Invalid
                  </button>
                </div>
              </div>
            </div>
          </form>
        ))}
    </div>
  );
};

export default Diagnosis;
