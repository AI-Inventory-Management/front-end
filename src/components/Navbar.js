import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ title }) => {
  return (
    <div className="nav-navbar">
      <h1>{title}</h1>
      <Link className="nav-user-letter-link" to="/usuario">
        <div className="nav-user-letter">P</div>
      </Link>
    </div>
  );
};

export default Navbar;
