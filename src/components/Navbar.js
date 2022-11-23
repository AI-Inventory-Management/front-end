import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ title }) => {
  return (
    <div className="nav-navbar">
      <h1>{title}</h1>
    </div>
  );
};

export default Navbar;
