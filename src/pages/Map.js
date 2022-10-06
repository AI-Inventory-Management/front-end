import React from "react";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import "../styles/Map.css";

function Map() {
  return (
    <div className="container">
      <Navbar title="Mapa" />
      <div className="map-container">
        <MapComponent />
      </div>
    </div>
  );
}

export default Map;
