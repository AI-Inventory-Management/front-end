import React from "react";
import Navbar from "../components/Navbar";
import "../styles/User.css";

function User() {
  return (
    <div className="us-container">
      <Navbar title="Usuario" />
      <p>Post Malone</p>
      <p>Vive en USA y trabaja para él</p>
    </div>
  );
}

export default User;
