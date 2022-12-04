/*
  Authors: Andrea Vianey Diaz Alvarez
  Description: Muestra los detalles del producto seleccionado en el filtro de productos
*/
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreContext } from "../components/StoreProvider";
import "../styles/Filter.css";
import "../styles/Product.css";
import toast, { Toaster } from "react-hot-toast";


function Product() {
  const [, , , , productId] = useContext(StoreContext);
  const [ProductData, setProductData] = useState([
    {
      name: "No disponible",
      description: "No disponible",
      ean: "No disponible",
      price: "No disponible",
      id_product: "No disponible",
    },
  ]); //Guarda la información del producto

  useEffect(() => {
    //Regresa la información del producto con el id del producto
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/product/getProduct/${productId}`, requestOptionsGET)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

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
      <Toaster />
    </div>
  );
}

export default Product;
