import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="ds-container">
      <Navbar title="Dashboard" />
      <div>
        <iframe
          width="960"
          height="720"
          src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/560760329438/dashboards/416ddf5a-5049-46fb-af8f-423da678fa9c?directory_alias=riico-dashboard">
        </iframe>
      </div>
    </div>
  );
}

export default Dashboard;
