import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="ds-container">
      <Navbar title="Dashboard" />
      <div>
        <h2>Inicio</h2>
        <h2>Aquí va el dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;
