import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import dashboard from "../images/DashboardMVP.png";

function Dashboard() {
  return (
    <div className="ds-container">
      <Navbar title="Dashboard" />
      <div style={{height:"100%"}}>
        <iframe
          width="100%"
	  className="ds-dashboard"
          height="calc(100% - 80px)"
          src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/560760329438/dashboards/416ddf5a-5049-46fb-af8f-423da678fa9c?directory_alias=riico-dashboard">
        </iframe>
      </div>
    </div>
  );
}

export default Dashboard;
