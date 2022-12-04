import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import "../styles/Map.css";
import StoreInfo from "../components/StoreInfo";
import StoreSales from "../components/StoreSales";
import SodaInfo from "../components/SodaInfo";
import Refrigerator from "../components/Refrigerator";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";

function Map() {
  const { id } = useParams();

  const [isShowingInfo, setIsShowingInfo] = useState(false);
  const [isShowingFridge, setIsShowingFridge] = useState(false);
  const [selectedStoreInfo, setSelectedStoreInfo] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [storeId, setStoreId] = useState();
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState();
  const [storeSales, setStoreSales] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [inventory, setInventory] = useState([1, 2, 3, 4]);

  const navigate = useNavigate();
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
    fetchStoreInfo(id);
  };

  /*
  calcula si es necesario añadir espacios extra al refrigerador en base al inventario de
  la tienda
  */
  const handleInventory = (stock) => {
    let stock2 = stock;
    const remainer = stock2.length % 4;
    if (remainer !== 0) {
      for (let i = remainer; i < 4; ++i) {
        stock2.push({ id_product: 9999, name: "", stock: 0 });
      }
    }
    setInventory(stock2);
  };

  const fetchStoreInfo = useCallback(
    // Obtiene la información de la tienda (nombre, ventas, dirección e inventario)
    async (idStore) => {
      if (idStore === undefined) return;

      if (!isShowingInfo) {
        setIsShowingInfo(true);
      }
      setStoreId(idStore);
      try {
        const myHeadersToken = new Headers();
        myHeadersToken.append("Content-Type", "application/json");
        myHeadersToken.append(
          "Authorization",
          `Bearer ${window.sessionStorage.getItem("bearerToken")}`
        );

        const requestOptionsGET = {
          method: "GET",
          headers: myHeadersToken,
        };
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/store/getStoreData/${idStore}`,
          requestOptionsGET
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        setStoreAddress(data.address);
        setStoreSales(data.sales);
        handleInventory(data.stock);
        setStoreName(data.name);
      } catch (error) {
        console.log(error.message);
      }
    },
    [isShowingInfo]
  );

  const MINUTE_MS = 6000;

  useEffect(() => {
    fetchStoreInfo(id);
    const interval = setInterval(() => {
      console.log("Logs every minute");
      fetchStoreInfo(id);
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [fetchStoreInfo, id, storeId]);

  return (
    <div className="ma-map">
      <Navbar title="Mapa" />
      <div
        className={`ma-container ${
          isShowingFridge ? "ma-container--flex" : ""
        }`}
      >
        <div
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 10px",
            position: "relative",
            width: `${isShowingFridge ? "30%" : "100%"}`,
            height: `${isShowingFridge ? "30%" : "100%"}`,
            marginTop: `${isShowingFridge ? "2rem" : ""}`,
          }}
        >
          <MapComponent
            markers={markers}
            onSelectStore={onSelectStoreHandler}
            selectedStore={selectedStoreInfo}
            isShowingInfo={isShowingInfo}
          />
          {isShowingFridge && (
            <button
              onClick={() => {
                setIsShowingFridge(false);
              }}
              className={`${isShowingFridge ? "ma-return-button" : ""}`}
            >
              <HiOutlineArrowUturnLeft color="white" size={20} />
            </button>
          )}
        </div>
        {isShowingFridge && <Refrigerator inventory={inventory} />}
        {isShowingInfo && (
          <div className={`ma-info ${isShowingFridge ? "ma-info--flex" : ""}`}>
            <div className="ma-info-container">
              <StoreInfo id={storeId} name={storeName} address={storeAddress} />
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
