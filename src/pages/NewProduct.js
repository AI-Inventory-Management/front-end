import { PureComponent, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/NewProduct.css";
import "../styles/Filter.css";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

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
    setName(event.target.value)
  };
  const changeEAN = (event) => {
    setEAN(event.target.value)
  };
  const changeDescription = (event) => {
    setDescription(event.target.value)
  };
  
  //Update Database
  const AddProduct = async () => {
    if (name === "" | description ==="" | price ==="" | ean === ""){
      toast.error('Debes llenar todos los campos')
    }
    else{
      const headers = new Headers({'Content-Type': 'application/json'})
      console.log(description, name, ean,price)
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/store/postNewProduct`,
        {method: 'POST', body: JSON.stringify({'name': name, 'description': description, 'ean': ean, 'price': price}), headers: headers}
      );
      const json = await response.json();
      if (json.message === "success"){
        toast.success('Se ha creado un producto nuevo')
        setName('')
        setDescription('')
        setEAN('')
        setPrice('')
      }
      else{
        toast.error("Hubo un error en la creación del producto")
      }
    }
  };

  return (
    <div className="NewStore-container">
      <Navbar title="Añadir Producto" />
      <div className="NewStore-card">
        <p>Llena los campos para crear un producto nuevo</p>
        <table className="NewStore-table">
          <td className="filter-results-td">
            <tr className="filter-lable">Nombre:</tr>
            <tr className="filter-lable">Descripción:</tr>
            <tr className="filter-lable">EAN:</tr>
            <tr className="filter-lable">Precio:</tr>
          </td>
          <td>
            <tr><input className="filter-input" onChange={changeName} value={name}/></tr>
            <tr><input className="filter-input" onChange={changeDescription} value={description}/></tr>
            <tr><input className="filter-input" onChange={changeEAN} value={ean}/></tr>
            <tr><input className="filter-input" onChange={changePrice} value={price}/></tr>
          </td>
        </table>
        <Link to="/Products">
          <button className="filter-button">
            Regresar
          </button>
        </Link>
        <button className="filter-button" onClick={AddProduct}>
          Añadir
        </button>
        <Toaster />
      </div>
    </div>
  );
}

export default Newproduct;
