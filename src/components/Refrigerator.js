import "../styles/Refrigerator.css";
import { showSoda } from "../showSoda";

function Refrigerator(props) {
  console.log(props.inventory);
  return (
    <div className="rf-refrigerator">
      <div key="rf-grid1" className="rf-grid">
        {props.inventory.map((soda) => {
          return (
            <div
              key={soda.id_product}
              className="rf-sodaa"
              style={{ backgroundColor: "#c2c2c2" }}
            >
              <img className="rf-soda-img" src={showSoda(soda.id_product)} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          paddingTop: "1rem",
          backgroundColor: "red",
          height: "4rem",
          width: "100%",
        }}
      >
        {[1, 2, 3, 4].map((lines) => {
          return (
            <div
              key={lines}
              style={{ color: "red", borderTop: "3px solid black" }}
            >
              {lines}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Refrigerator;
