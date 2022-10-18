import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { fetchDiagnosis, fetchSymptoms } from "../api/apiRequests";
import Diagnosis from "./Diagnosis";
import { loadingSpinner } from "../helpers/spinner";
import { dateOfBirth, genderSelect } from "../helpers/helperMethods";

const Diagnose = () => {
  const [diagnosisResult, setDiagnosisResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDob, setSelectedDob] = useState("");

  const localStorageSymptoms = localStorage.getItem("symptoms")
    ? JSON.parse(localStorage.getItem("symptoms"))
    : null;

  const loadSymptoms = async () => {
    try {
      if (localStorageSymptoms) {
        setSymptoms(localStorageSymptoms);
      } else {
        const data = await fetchSymptoms();
        setSymptoms(data);
        localStorage.setItem("symptoms", JSON.stringify(data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const state = { options: symptoms && symptoms };

  useEffect(() => {
    loadSymptoms();
  }, []);

  const filterIds = (list) => {
    const idList = [];
    list.map((item) => {
      idList.push(item.ID);
    });
    return idList;
  };

  const onSelect = (selectedList, selectedItem) => {
    const idList = [];
    selectedList.forEach((item) => {
      idList.push(item.ID);
    });
    setSelectedSymptoms(filterIds(selectedList));
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedSymptoms(filterIds(selectedList));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = { selectedSymptoms, selectedGender, selectedDob };
      const response = await fetchDiagnosis(formData);
      setDiagnosisResult(response.data);
      localStorage.setItem("diagnosisData", JSON.stringify(response.data));
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
      setLoading(false);
    }
  };
  return (
    <div className="container ">
    
      <div className="row">
        <div className="col-md-6">
          {symptoms ? (
            <form className="row border border-1 p-3" onSubmit={handleSubmit}>
              <div className="col-md-12 mb-3">
                <label htmlFor="symptomsInput" className="form-label">
                  Symptoms
                </label>
                <Multiselect
                  options={symptoms}
                  selectedValues={state.selectedValue}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="Name"
                />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Date of Birth
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSelectedDob(e.target.value);
                  }}
                >
                  <option defaultValue="Open this select menu">
                    Open this select menu
                  </option>
                  {dateOfBirth.map((dob) => (
                    <option key={dob.id} value={dob.dob}>
                      {" "}
                      {dob.dob}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  {" "}
                  Gender
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                  }}
                >
                  <option defaultValue="Open this select menu">
                    Open this select menu
                  </option>
                  {genderSelect.map((gen) => (
                    <option key={gen.id} value={gen.gender}>
                      {" "}
                      {gen.gender}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            loadingSpinner()
          )}
        </div>
        <div className="col-md-6">
          <Diagnosis data={diagnosisResult} />
        </div>
      </div>
    </div>
  );
};

export default Diagnose;
