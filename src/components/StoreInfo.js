import React from "react";
import "../styles/StoreInfo.css";

function StoreInfo(props) {
  return (
    <div className="si-container">
      <div className="si-info">
        <p className="si-info-title">ID</p>
        <p className="si-info-text">{props.id}</p>
      </div>
      <div className="si-info">
        <p className="si-info-title">Dirección</p>
        <p className="si-info-text">
          Avenida de la Luz, Calzada de Atizapan, Cuajimalpa, CDMX. CP: 030201
        </p>
      </div>
    </div>
  );
}

export default StoreInfo;
