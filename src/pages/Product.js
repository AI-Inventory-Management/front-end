import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreContext } from "../components/StoreProvider";
import "../styles/Filter.css";
import Select from "react-select";
import "../styles/Product.css";

function Product() {
  const [, , , , productId] = useContext(StoreContext);
  const [ProductData, setProductData] = useState([{name: "No disponible", description: "No disponible", ean: "No disponible", price: "No disponible", id_product: "No disponible"}]);

  useEffect(() => {
    console.log(productId)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/store/getProduct/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      });
  });

  return (
    <div className="filter-container">
      <Navbar title={String(ProductData[0].name)} />
      <table className="product-table">
        <tbody>
          <tr>
            <td className="product-td">Nombre:</td>
            <td className="product-td">{ProductData[0].name}</td>
          </tr>
          <tr>
            <td className="product-td">Descripción:</td>
            <td className="product-td">{ProductData[0].description}</td>
          </tr>
          <tr>
            <td className="product-td">Id:</td>
            <td className="product-td">{ProductData[0].id_product}</td>
          </tr>
          <tr>
            <td className="product-td">EAN:</td>
            <td className="product-td">{ProductData[0].ean}</td>
          </tr>
          <tr>
            <td className="product-td">Precio:</td>
            <td className="product-td">{ProductData[0].price}</td>
          </tr>
        </tbody>
      </table>
      <table className="edit-table">
        <tbody>
          <tr>
            <td className="product-select">
              <Select placeholder="Campo" options={[{ value: "-", label: "Campo"},{label:"Nombre"}, {label:"EAN"},{label:"Descripción"},{label:"Precio"}]}></Select>
            </td>
            <td>
              <input className="product-input"></input>
            </td>
          </tr>
          <td/>
          <button className="filter-button">Actualizar Campo</button>
        </tbody>
      </table>
    </div>
  );
}

export default Product;
