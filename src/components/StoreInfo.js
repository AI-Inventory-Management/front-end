import React from "react";
import "../styles/StoreInfo.css";

function StoreInfo() {
  return (
    <div className="si-container">
      <div className="si-info">
        <p className="si-info-title">ID</p>
        <p className="si-info-text">21309218309fej</p>
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
