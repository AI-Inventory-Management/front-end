import React from "react";
import "../styles/SodaInfo.css";
import { showSoda } from "../showSoda";

function SodaInfo(props) {
  // props.inventory -> matrix

  const initialValue = 0;
  const totalStock = props.inventory.reduce(
    (previousValue, currentValue) => previousValue + currentValue.stock,
    initialValue
  );

  return (
    <div className="soi-soda-info">
      <div className="soi-container">
        {props.inventory.map((soda) => {
          if (soda.stock > 0)
          return (
            <div key={soda.id_product} className="soi-li">
              <img className="soi-li-img" src={showSoda(soda.id_product)} />
              <div className="soi-li-text">
                <p className="soi-li-quantity">{soda.stock}</p>
                <p className="soi-li-percentage">
                  {((soda.stock / totalStock) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SodaInfo;
