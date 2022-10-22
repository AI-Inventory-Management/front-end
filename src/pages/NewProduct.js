import { PureComponent, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/NewProduct.css";
import "../styles/Filter.css";

function Newproduct() {
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [ean, setEAN] = useState();

  //Inputs Changes
  const changePrice = (event) => {
    setPrice(event.target.value)
  };
  const changeName = (event) => {
    setName(String(event.target.value))
  };
  const changeEAN = (event) => {
    setEAN(event.target.value)
  };
  const changeDescription = (event) => {
    setDescription(String(event.target.value))
  };
  
  //Update Database
  const AddProduct = async () => {
    console.log(description, name, ean,price)
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}`,
      {method: 'POST', body: {'name': name, 'description': description, 'ean': ean, 'price': price}}
    );
    const json = await response.json();
    console.log(json);
    console.log("Crear Producto")
  };

  return (
    <div className="NewStore-container">
      <Navbar title="Añadir Producto" />
      <div className="NewStore-card">
        <p>Llena los campos para crear un nuevo Producto</p>
        <table className="NewStore-table">
          <td className="filter-results-td">
            <tr className="filter-lable">Nombre:</tr>
            <tr className="filter-lable">Descripción:</tr>
            <tr className="filter-lable">EAN:</tr>
            <tr className="filter-lable">Precio:</tr>
          </td>
          <td>
            <tr><input className="filter-input" onChange={changeName} /></tr>
            <tr><input className="filter-input" onChange={changeDescription}/></tr>
            <tr><input className="filter-input" onChange={changeEAN}/></tr>
            <tr><input className="filter-input" onChange={changePrice}/></tr>
          </td>
        </table>
        <button className="filter-button" onClick={AddProduct}>
          Añadir
        </button>
      </div>
    </div>
  );
}

export default Newproduct;
