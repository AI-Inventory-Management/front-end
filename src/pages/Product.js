import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreContext } from "../components/StoreProvider";
import "../styles/Filter.css";
import Select from "react-select";
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
  ]);
  const [Field, setField] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/product/getProduct/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  const changefield = (event) => {
    setField(event.target.value);
  };

  const Update = async () => {
    if (Field !== "") {
      const headers = new Headers({ "Content-Type": "application/json" });
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/store/postUpdateProduct`,
        {
          method: "POST",
          body: JSON.stringify({ data: Field}),
          headers: headers,
        }
      );
      const json = await response.json();
      console.log(json)
    }
    else{
        toast.error("El campo está vacío")
    }
  };

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
              <Select
                placeholder="Campo"
                options={[
                  { value: "-", label: "Campo" },
                  { label: "Nombre" },
                  { label: "EAN" },
                  { label: "Descripción" },
                  { label: "Precio" },
                ]}
              ></Select>
            </td>
            <td>
              <input className="product-input" onChange={changefield}></input>
            </td>
          </tr>
          <td />
          <button className="filter-button" onClick={Update}>
            Actualizar Campo
          </button>
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}

export default Product;
