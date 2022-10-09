import React from "react";
import "../styles/SodaInfo.css";

function SodaInfo() {
  return (
    <div className="soi-soda-info">
      <div className="soi-container">
        {[7, 6, 5, 4, 3, 2, 1].map((soda) => {
          return (
            <div key={soda} className="soi-li">
              <img
                className="soi-li-img"
                src="https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-512.png"
              />
              <div className="soi-li-text">
                <p className="soi-li-quantity">{8 + soda}</p>
                <p className="soi-li-percentage">{soda * 4.5}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SodaInfo;
