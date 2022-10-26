import React from "react";
import "../styles/StoreSales.css";
import { v4 as uuidv4 } from "uuid";

function StoreSales(props) {
  // props.sales -> array
  return (
    <div className="ss-container">
      <p className="ss-title">Top Ventas</p>
      <div className="ss-sales-container">
        {props.sales.length === 0 && <p>No hay ventas</p>}
        {props.sales.length > 0 && (
          <ol
            className={`ss-ol ${
              props.sales.length >= 7 ? "ss-ol--two-cols" : ""
            }`}
          >
            {props.sales.map((sale) => {
              return (
                <li key={uuidv4()}>
                  <div className="ss-li">
                    <p className="ss-li-soda">{sale.name}</p>
                    <p className="ss-li-sales">{sale.sales}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

export default StoreSales;
