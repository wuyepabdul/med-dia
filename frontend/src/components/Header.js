import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-4 bg-info d-flex justify-content-center align-items-center">
      <ul className="d-flex justify-content-center nav-links align-items-center">
        <li className="mx-3">
          <Link to="/">Home </Link>
        </li>
        <li className="mx-3">
          <Link to="/validates">Diagnosis </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
