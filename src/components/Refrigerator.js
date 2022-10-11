import React from "react";
import "../styles/Refrigerator.css";

function Refrigerator() {
  const getType = (code) => {
    switch (code) {
      case 1:
        return "#c2c2c2";
      case 2:
        return "#c2c2c2";
      case 3:
        return "#c2c2c2";
      default:
        return "#c2c2c2";
    }
  };

  return (
    <div className="rf-refrigerator">
      <div className="rf-container">
        {[1, 2].map((elem) => {
          return (
            <div key={elem} className="rf-shelf">
              {[1, 2, 3, 4].map((sodaa) => {
                return (
                  <div
                    key={sodaa}
                    className="rf-soda"
                    style={{ backgroundColor: getType(sodaa) }}
                  />
                );
              })}
            </div>
          );
        })}
        <div
          style={{
            paddingTop: "1rem",
            backgroundColor: "red",
            height: "4rem",
            width: "100%",
          }}
        >
          {[1, 2, 3, 4].map((a) => {
            return (
              <div
                key={a}
                style={{ color: "red", borderTop: "3px solid black" }}
              >
                {a}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Refrigerator;
