import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreContext } from "../components/StoreProvider";
import "../styles/Filter.css";
import "../styles/Product.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Product(props) {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (props.isLoggedIn === true){
      const myHeadersToken = new Headers();
      myHeadersToken.append("Content-Type", "application/json");
      myHeadersToken.append("Authorization", `Bearer ${window.sessionStorage.getItem("bearerToken")}`);
    
      const requestOptionsGET = {
        method: "GET",
        headers: myHeadersToken,
      };
  
      fetch(`${process.env.REACT_APP_BACKEND_URL}/product/getProduct/${productId}`, requestOptionsGET)
        .then((response) =>{
          //console.log('RESPONSE', response);
          // Authorization token
          if (response.status === 401){
            toast.error("Session expired.");
            toast.error("Please sign in again");
            props.setIsLoggedIn(false);
            window.sessionStorage.removeItem("isLoggedIn");
            window.sessionStorage.removeItem("role");
            window.sessionStorage.removeItem("bearerToken");
            navigate("/");
          }
          return response.json();
        })
        .then((data) => {
          console.log('DATA', data);
          setProductData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    }
  }, [navigate, productId, props]);

  const changefield = (event) => {
    setField(event.target.value);
  };

  const Update = async () => {
    if (Field !== "") {
      const headers = new Headers({ "Content-Type": "application/json", "Authorization": `Bearer ${window.sessionStorage.getItem("bearerToken")}` });
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/store/postUpdateProduct`,
        {
          method: "POST",
          body: JSON.stringify({ data: Field}),
          headers: headers,
        }
      );
      // Authorization token
      if (response.status === 401){
        toast.error("Session expired.");
        toast.error("Please sign in again");
        props.setIsLoggedIn(false);
        window.sessionStorage.removeItem("isLoggedIn");
        window.sessionStorage.removeItem("role");
        window.sessionStorage.removeItem("bearerToken");
        navigate("/");
      }
      const json = await response.json();
      console.log(json)
    }
    else{
        toast.error("El campo está vacío")
    }
  };

  return (
    <div className="filter-container">
      {/* {console.log('PRODUCT DATA', ProductData[0])} */}
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
