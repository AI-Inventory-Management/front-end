import React from "react";
import "../styles/StoreInfo.css";

function StoreInfo(props) {
  return (
    <div className="si-container">
      <div className="si-info">
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <p className="si-info-title">{props.name}</p>
          <p className="si-info-text" style={{ color: "darkred" }}>
            {props.id}
          </p>
        </div>
        <p className="si-info-text">{props.address}</p>
      </div>
    </div>
  );
}

export default StoreInfo;
