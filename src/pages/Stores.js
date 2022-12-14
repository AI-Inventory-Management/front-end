import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Refrigerator from "../components/Refrigerator";
import StoreInfo from "../components/StoreInfo";
import StoreSales from "../components/StoreSales";
import SodaInfo from "../components/SodaInfo";
import "../styles/Stores.css";
import { StoreContext } from "../components/StoreProvider";

function Stores() {
  const [storesId, , storeName] = useContext(StoreContext);
  const [isShowingMap, setIsShowingMap] = useState(false);

  const onChangeShowingMap = () => {
    setIsShowingMap(!isShowingMap);
  };

  return (
    <div className="st-stores">
      <Navbar title={storeName} />
      <div className="st-container">
        <div
          className={`st-map ${isShowingMap ? "" : "st-map--small"}`}
          onClick={onChangeShowingMap}
        />
        {!isShowingMap && <Refrigerator />}
        <div className="st-info-container">
          <StoreInfo id={1} />
          <StoreSales sales={[1, 2, 3, 4, 5, 6, 7]} />
          <SodaInfo inventory={[1, 2, 3, 4, 5, 6]} />
        </div>
      </div>
    </div>
  );
}

export default Stores;
