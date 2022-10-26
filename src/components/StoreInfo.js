import React from "react";
import "../styles/StoreInfo.css";

function StoreInfo(props) {
  return (
    <div className="si-container">
      <div className="si-info">
        <p className="si-info-title">
          ID{" "}
          <span className="si-info-text" style={{ marginLeft: "1rem" }}>
            {props.id}
          </span>
        </p>
      </div>
      <div className="si-info">
        <p className="si-info-title">Dirección</p>
        <p className="si-info-text">{props.address}</p>
      </div>
    </div>
  );
}

export default StoreInfo;
