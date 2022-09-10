import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { fetchSymptoms } from "./api/apiRequests";
import "./App.css";
import Diagnose from "./components/Diagnose";
import DiagnosisValidity from "./components/DiagnosisValidity";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <h3 className="text-center mt-3">Patient Diagnosis</h3>

        <Routes>
          <Route exact path="/" element={<Diagnose />} />
          <Route exact path="/validates" element={<DiagnosisValidity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
