import Navbar from "../components/Navbar";
import "../styles/Filter.css";
import { BiChevronRightSquare } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StoreContext } from "../components/StoreProvider";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';

function Products() {
  const [, setStoresId, , setStoreName,,setProductId] = useContext(StoreContext); 
  const [products, setProducts] = useState([]); 
  const [lstNames, setLstNames] = useState([{"label": "Fanta"}]);

  //Get Names
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/store/getAllProductsNames`)
      .then((response) => response.json())
      .then((data) => {
        const names = data;
        setLstNames(names);
      })
  }, []);


  //Display selects info
  const [selectedName, setSelectedName] = useState(); 

  //Filter data recopilation
  const [ean, setEan] = useState("ean"); 
  const [name, setName] = useState("name");
  const [id, setId] = useState("id_product");
  const [price, setPrice] = useState("price");

  //Selects Changes
  function handleSelectName(data) {
    if (data.label === ''){
      setName("name") 
    }
    else{
      setName(`'` + data.label + `'`);
    }
    setSelectedName(data);
  }

  //Inputs Changes
  const changeEan = (event) => {
    setEan(`'` + event.target.value + `'`);
    if (event.target.value === "") {
      setEan("ean");
    }
  };
  const changePrice = (event) => {
    setName(`'` + event.target.value + `'`);
    if (event.target.value === "") {
      setName("price");
    }
  };
  const changeId = (event) => {
    setId(event.target.value);
    if (event.target.value === "") {
      setId("id_product");
    }
  };

  //Selects style
  const colourStyles = {
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? "black" : styles.color,
      backgroundColor: state.isSelected ? "#d3d3d3" : styles.color,
      borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
      "&:hover": {
        color: "black",
        backgroundColor: "#d3d3d3",
      },
    }),
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "#d3d3d3",
      boxShadow: state.isFocused ? "#d3d3d3" : 0,
      borderColor: state.isFocused ? "#d3d3d3" : "#d3d3d3",
      "&:hover": {
        borderColor: state.isFocused ? "#d3d3d3" : "#CED4DA",
      },
    }),
  };

  //Search button
  const GetProducts = async () => {
    /*const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/store/getAllProducts?name=${name}&id=${id}&ean=${ean}&price=${price}`
    );
    const json = await response.json();
    console.log(json);
    setStore(json);*/
    toast.success('Busqueda exitosa')
    console.log(id, name, ean, price);  
  };

  //Product button
  const SetProductId = async (id, name) => {
    setProductId(id);
  };

  return (
    <div className="filter-container">
      <Navbar title="Inventario de Productos" />
      <div className="filter-card">
        <p>Llena los campos para poder filtrar el resultado</p>
        <Link to="/NewProduct">
          <div className="filter-add-button">
            <BiAddToQueue />
            <span class="buttontext">Añadir Producto</span>
          </div>
        </Link>
        <table className="filter-table">
          <td className="filter-results-td">
            <tr className="filter-lable">Identificador:</tr>
            <tr className="filter-lable">Precio:</tr>
            <tr className="filter-lable">Nombre:</tr>
            <tr className="filter-lable">EAN:</tr>
          </td>
          <td>
            <tr>
              <input className="filter-input" name="Id" onChange={changeId} />
            </tr>
            <tr>
              <input
                className="filter-input"
                name="precio"
                onChange={changePrice}
              />
            </tr>
            <tr>
              <div className="filter-select">
                <Select
                  defaultValue={""}
                  options={lstNames}
                  placeholder=""
                  value={selectedName}
                  onChange={handleSelectName}
                  isSearchable={true}
                  styles={colourStyles}
                />
              </div>
            </tr>
            <tr>
              <input
                className="filter-input"
                name="ean"
                onChange={changeEan}
              />
            </tr>
            <tr>
              <button className="filter-button" onClick={GetProducts}>
                Buscar
              </button>
            </tr>
          </td>
          <td className="filter">
            <table className="filter-results">
              <td className="filter-results-td">
                <th className="filter-th">Id</th>
                {products.length !== 0 &&
                  products.map((Products, index) => (
                    <tr className="filter-tr">{Products.id_product}</tr>
                  ))}
              </td>
              <td className="filter-results-td">
                <th className="filter-th">Nombre</th>
                {products.length !== 0 &&
                  products.map((Products, index) => (
                    <tr className="filter-tr">
                      <p className="filter-p">{Products.name}</p>
                    </tr>
                  ))}
                {products.length === 0 && (
                  <p className="no-stores">No se encontraron productos</p>
                )}
              </td>
              <td className="filter-results-td">
                <th className="filter-th">Precio</th>
                {products.length !== 0 &&
                  products.map((Products, index) => (
                    <tr className="filter-tr">{Products.precio}</tr>
                  ))}
              </td>
              <td className="filter-results-td">
                <th className="filter-th">Ver</th>
                {products.length !== 0 &&
                  products.map((product, index) => (
                    <tr className="filter-tr">
                      <Link to="/tiendas">
                        <BiChevronRightSquare
                          className="filter-show"
                          key={product.id}
                          onClick={() => SetProductId(product.id)}
                        />
                      </Link>
                    </tr>
                  ))}
              </td>
            </table>
          </td>
        </table>
      </div>
      <Toaster/>
    </div>
  );
}

export default Products;
