import React from "react";
import "../styles/StoreSales.css";

function StoreSales(props) {
  // props.sales -> array
  // sort the sales
  console.log(props.sales);
  return (
    <div className="ss-container">
      <p className="ss-title">Top Ventas</p>
      <div className="ss-sales-container">
        <ol
          className={`ss-ol ${
            props.sales.length >= 7 ? "ss-ol--two-cols" : ""
          }`}
        >
          {props.sales.map((elem) => {
            return (
              <li key={elem}>
                <div className="ss-li">
                  <p className="ss-li-soda">
                    Coca cola <span className="ss-li-sales">599</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default StoreSales;
