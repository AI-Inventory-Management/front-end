import { PureComponent, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/NewProduct.css";
import "../styles/Filter.css";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

function Newproduct() {
  const navigate = useNavigate();

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
      const headers = new Headers({'Content-Type': 'application/json', "Authorization": `Bearer ${window.sessionStorage.getItem("bearerToken")}`})
      console.log(description, name, ean,price)
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/product/postNewProduct`,
        {method: 'POST', body: JSON.stringify({'name': name, 'description': description, 'ean': ean, 'price': price}), headers: headers}
      );
      // Authorization token
      if (response.status === 401){
        toast.error("Session expired.");
        toast.error("Please sign in again");
        window.sessionStorage.removeItem("isLoggedIn");
        window.sessionStorage.removeItem("role");
        window.sessionStorage.removeItem("bearerToken");
        navigate("/");
      }
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
          <tr className="filter-results-td">
            <td className="filter-lable">Nombre:</td>
            <td><input className="filter-input" onChange={changeName} value={name}/></td>
          </tr>
          <tr>
            <td className="filter-lable">Descripción:</td>
            <td><input className="filter-input" onChange={changeDescription} value={description}/></td>
          </tr>
           <tr>
            <td className="filter-lable">EAN:</td>
            <td><input className="filter-input" onChange={changeEAN} value={ean}/></td>
            </tr> 
          <tr>
            <td className="filter-lable">Precio:</td>
            <td><input className="filter-input" onChange={changePrice} value={price}/></td>
          </tr>
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
