import React, { useEffect, useState } from "react";
import { saveDiagnosisData } from "../api/apiRequests";

const Diagnosis = (props) => {
  const localStorageDiagnosis = localStorage.getItem("diagnosisData")
    ? JSON.parse(localStorage.getItem("diagnosisData"))
    : null;

  const [propsData, setPropsData] = useState([]);
  const [validity, setValidity] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let componentName = "";
  let componentAccuracy = 0;
  let componentProfName = "";
  let componentIcdName = "";
  let componentIcd = "";
  let componentRanking = 0;

  const onSearch = (e) => {
    const filteredData = propsData.filter((item) => {
      return item.Issue.Name.toUpperCase().startsWith(
        `${e.target.value.toUpperCase()}`
      );
    });
    setPropsData(filteredData);

    if (e.target.value.length === 0) {
      setPropsData(localStorageDiagnosis ? localStorageDiagnosis : props.data);
    }
  };

  useEffect(() => {
    if (localStorageDiagnosis) {
      setPropsData(localStorageDiagnosis);
    } else {
      setPropsData(props.data);
    }
  }, []);

  const organizeDiagnosisData = async (data, validityState) => {
    try {
      componentName = data.Name;
      componentAccuracy = data.Accuracy;
      componentIcd = data.Icd;
      componentIcdName = data.IcdName;
      componentProfName = data.ProfName;
      componentRanking = data.Ranking;

      setLoading(true);

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
        setLoading(false);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.log("error", error.message);
      setLoading(false);
      setSuccess(false);
      setError(true);
      setTimeout(() => {
        setError(false);
        setSuccess(false);
      }, 1000);
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
      {success === true && (
        <h2 className="text-success"> Validation Successful</h2>
      )}

      {error === true && (
        <h2 className="text-warning"> Validation unsuccessful</h2>
      )}

      {props.length === 0 && (
        <h2 className="text-warning text-center">Submit your symptoms</h2>
      )}
      <form className="row border border-1 p-3 mb-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Diagnosis by name"
            aria-describedby="button-addon2"
            onChange={onSearch}
          />
        </div>
      </form>

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
                    disabled={loading ? true : false}
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
                    disabled={loading ? true : false}
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
