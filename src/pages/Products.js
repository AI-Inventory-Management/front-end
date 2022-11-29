import Navbar from "../components/Navbar";
import "../styles/Filter.css";
import { BiChevronRightSquare } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../components/StoreProvider";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";

function Products(props) {
  const navigate = useNavigate();
  const [, , , , , setProductId] = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [lstNames, setLstNames] = useState([{ label: "" }]);

  //Get Names
  useEffect(() => {
    if (props.loggedIn === true){
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
  
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/product/getAllProductsNames`,
        requestOptionsGET
      )
        .then((response) => {
          // Authorization token
          if (response.status === 401) {
            window.sessionStorage.removeItem("isLoggedIn");
            window.sessionStorage.removeItem("role");
            window.sessionStorage.removeItem("bearerToken");
            navigate("/");
          }
          response.json();
        })
        .then((data) => {
          setLstNames([{ label: "" }].concat(data));
        });
    }
  }, [navigate, props.loggedIn]);

  //Display selects info
  const [selectedName, setSelectedName] = useState();

  //Filter data recopilation
  const [ean, setEan] = useState("ean");
  const [name, setName] = useState("name");
  const [id, setId] = useState("id_product");
  const [price, setPrice] = useState("price");

  //Selects Changes
  function handleSelectName(data) {
    if (data.label === "") {
      setName("name");
    } else {
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
    setPrice(event.target.value);
    if (event.target.value === "") {
      setPrice("price");
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

  const GetProducts = async () => {
    //Search button
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

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/getAllProducts?name=${name}&id=${id}&ean=${ean}&price=${price}`,
      requestOptionsGET
    );
    // Authorization token
    if (response.status === 401) {
      window.sessionStorage.removeItem("isLoggedIn");
      window.sessionStorage.removeItem("role");
      window.sessionStorage.removeItem("bearerToken");
      navigate("/");
    }
    const json = await response.json();
    setProducts(json);
    toast.success("Busqueda exitosa");
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
            <span className="buttontext">Añadir Producto</span>
          </div>
        </Link>
        <div className="filter">
          <table className="filter-table">
            <tbody>
              <tr>
                <td>Identificador:</td>
                <td>
                  <input
                    className="filter-input"
                    name="Id"
                    onChange={changeId}
                  />
                </td>
              </tr>
              <tr>
                <td>Precio:</td>
                <td>
                  <input
                    className="filter-input"
                    name="precio"
                    onChange={changePrice}
                  />
                </td>
              </tr>
              <tr>
                <td>Nombre:</td>
                <td>
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
                </td>
              </tr>
              <tr>
                <td>EAN:</td>
                <td>
                  <input
                    className="filter-input"
                    name="ean"
                    onChange={changeEan}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="filter-button" onClick={GetProducts}>
                    Buscar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="filter-table-container">
            <table className="filter-table-2">
              <tbody>
                <tr>
                  <th className="filter-titles">Id</th>
                  <th className="filter-titles">Nombre</th>
                  <th className="filter-titles">Ver</th>
                </tr>
                <tr>
                  <td>
                    {products.length !== 0 &&
                      products.map((Products, index) => (
                        <div className="filter-results">
                          {Products.id_product}
                        </div>
                      ))}
                  </td>
                  <td>
                    {products.length !== 0 &&
                      products.map((Products, index) => (
                        <div className="filter-results">{Products.name}</div>
                      ))}
                    {products.length === 0 && (
                      <div className="no-stores">
                        No se encontraron productos
                      </div>
                    )}
                  </td>
                  <td>
                    {products.length !== 0 &&
                      products.map((product, index) => (
                        <div className="filter-results">
                          <Link to="/product">
                            <BiChevronRightSquare
                              className="filter-show"
                              key={product.id}
                              onClick={() => SetProductId(product.id_product)}
                            />
                          </Link>
                        </div>
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Products;
