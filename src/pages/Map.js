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
  const [storeId, setStoreId] = useState();
  const [storeAddress, setStoreAddress] = useState();
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
    if (!isShowingInfo) {
      setIsShowingInfo(true);
    }
    setStoreId(id);
    fetchStoreInfro(id);
  };

  const handleInventory = (stock) => {
    let stock2 = stock;
    const remainer = stock2.length % 4;
    if (remainer !== 0) {
      for (let i = remainer; i < 4; ++i)
      {
        stock2.push({id_product: 9999, name: "", stock: 0});
      }
    }
    setInventory(stock2);
  }

  const fetchStoreInfro = (id_store) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/store/getStoreData/${id_store}`
    ).then((response) => {
      response.json().then((result) => {
        setStoreAddress(result.address);
        setStoreSales(result.sales);
        handleInventory(result.stock);
      });
    });
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
        {isShowingFridge && <Refrigerator inventory={inventory}/>}
        {isShowingInfo && (
          <div className={`ma-info ${isShowingFridge ? "ma-info--flex" : ""}`}>
            <div className="ma-info-container">
              <StoreInfo id={storeId} address={storeAddress} />
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
