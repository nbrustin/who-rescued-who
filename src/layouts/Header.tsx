import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="d-flex justify-content-center mb-3 green">
        <h1>Who Rescued Who?</h1>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <h4>Finding rescue and shelter animals a new home</h4>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <nav>
          <ul className="d-flex d-inline-flex">
            <li style={{ marginRight: "10px" }}>
              <Link to="/who-rescued-who">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
