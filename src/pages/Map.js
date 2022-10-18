import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import "../styles/Map.css";
import StoreInfo from "../components/StoreInfo";
import StoreSales from "../components/StoreSales";
import SodaInfo from "../components/SodaInfo";
import Refrigerator from "../components/Refrigerator";

function Map() {
  const [isShowingInfo, setIsShowingInfo] = useState(false);
  const [isShowingFridge, setIsShowingFridge] = useState(false);
  const [selectedStoreInfo, setSelectedStoreInfo] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [storeId, setStoreId] = useState(0);
  const [storeSales, setStoreSales] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [inventory, setInventory] = useState([1, 2, 3, 4]);

  // estado inicial
  // mostrar mapa

  // si toca un refresco
  // mostrar menu derecho
  // mostrar info
  //mostrar top ventas
  // modificar centro /necesita estado que cambia solo una vez
  //si pica ver más
  //    hacer pequeño el mapa
  //    mostrar refri

  //    si toca el mapa
  //        hacer grande el mapa
  //        quitar refri

  // funcion para traer info de una tienda en específico
  const onSelectStoreHandler = (id) => {
    console.log(id);
    if (isShowingInfo) {
      setStoreId(id);
    } else {
      // fetch(id)
      // setSelectedStoreInfo(http.info);
      // if selectedStoreInfo.length !== 0
      //    isShowingInfo(true);
      setIsShowingInfo(true);
    }
  };

  // useEffect para traer la info de los markers

  return (
    <div className="ma-map">
      <Navbar title="Mapa" />
      <div
        className={`ma-container ${
          isShowingFridge ? "ma-container--flex" : ""
        }`}
      >
        <MapComponent
          width={`${isShowingFridge ? "30%" : "100%"}`}
          height={`${isShowingFridge ? "30%" : "100%"}`}
          markers={markers}
          onSelectStore={onSelectStoreHandler}
          selectedStore={selectedStoreInfo}
          isShowingInfo={isShowingInfo}
        />
        {isShowingFridge && <Refrigerator />}
        {isShowingInfo && (
          <div className={`ma-info ${isShowingFridge ? "ma-info--flex" : ""}`}>
            <div className="ma-info-container">
              <StoreInfo id={storeId} />
              <StoreSales sales={storeSales} />
              {!isShowingFridge && (
                <button
                  className="ma-info-button"
                  onClick={() => {
                    setIsShowingFridge(true);
                  }}
                >
                  Más información
                </button>
              )}
              {isShowingFridge && <SodaInfo inventory={inventory} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
