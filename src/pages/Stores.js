import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Refrigerator from "../components/Refrigerator";
import StoreInfo from "../components/StoreInfo";
import StoreSales from "../components/StoreSales";
import SodaInfo from "../components/SodaInfo";
import "../styles/Stores.css";

function Stores() {
  const [isShowingMap, setIsShowingMap] = useState(false);

  const onChangeShowingMap = () => {
    setIsShowingMap(!isShowingMap);
  };

  return (
    <div className="st-stores">
      <Navbar title="Tiendas" />
      <div className="st-container">
        <div
          className={`st-map ${isShowingMap ? "" : "st-map--small"}`}
          onClick={onChangeShowingMap}
        />
        {!isShowingMap && <Refrigerator />}
        {/* <div className={`${!isShowingMap ? "" : "hidden"}`}>
          <Refrigerator />
        </div> */}
        <div className="st-info-container">
          <StoreInfo />
          <StoreSales />
          <SodaInfo />
        </div>
      </div>
    </div>
  );
}

export default Stores;
