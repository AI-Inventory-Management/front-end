import Navbar from "../components/Navbar";
import "../styles/Filter.css";
import { BiChevronRightSquare } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import StoreProvider, { StoreContext } from "../components/StoreProvider";
import { useContext } from "react";

function Filter() {
  const [,setStoresId,, setStoreName] = useContext(StoreContext);
  const Stores = [
    { id: 1, name: "Oxxo" },
    { id: 2, name: "Tiendita" },
  ];

  /*
  const GetStores = async () =>{
    const response = await fetch(`http://localhost:8080/problem/getProposals`)
    const json = await response.json()
    stores(json)
  }
  */

  const SetStoreId = async (id,name) => {
    setStoresId(id);
    setStoreName(name);
  }

  return (
      <div className="filter-container">
        <Navbar title="Inventario Tienda" />
        <div className="filter-card">
          <p>Llena los filtros para poder ver el inventario de una tienda</p>
          <div className="filter-add-button">
            <BiAddToQueue />
            <span class="buttontext">Añadir Tienda</span>
          </div>
          <table className="filter-table">
            <td className="filter-results-td">
              <tr className="filter-lable">Identificador:</tr>
              <tr className="filter-lable">Nombre:</tr>
              <tr className="filter-lable">Estado:</tr>
              <tr className="filter-lable">Municipio:</tr>
              <tr className="filter-lable">Código Postal:</tr>
            </td>
            <td>
              <tr>
                <input className="filter-input" name="Id" />
              </tr>
              <tr>
                <input className="filter-input" name="name" />
              </tr>
              <tr>
                <input className="filter-input" name="state" />
              </tr>
              <tr>
                <input className="filter-input" name="municipality" />
              </tr>
              <tr>
                <input className="filter-input" name="CP" />
              </tr>
              <tr>
                <button className="filter-button">Buscar</button>
              </tr>
            </td>
            <td className="filter">
              <table className="filter-results">
                <td className="filter-results-td">
                  <th className="filter-th">Identificador</th>
                  {Stores.map((store, index) => (
                    <tr className="filter-tr">{store.id}</tr>
                  ))}
                </td>
                <td className="filter-results-td">
                  <th className="filter-th">Nombre</th>
                  {Stores.map((store, index) => (
                    <tr className="filter-tr">
                      <p className="filter-p">{store.name}</p>
                    </tr>
                  ))}
                  {Stores.length === 0 && (
                    <p className="no-stores">No se encontraron tiendas</p>
                  )}
                </td>
                <td className="filter-results-td">
                  <th className="filter-th">Ver tienda</th>
                  {Stores.map((store, index) => (
                    <tr className="filter-tr">
                      <Link to="/tiendas">
                        <BiChevronRightSquare
                          className="filter-show"
                          key={store.id}
                          onClick = {() => SetStoreId(store.id, store.name)}
                        />
                      </Link>
                    </tr>
                  ))}
                </td>
              </table>
            </td>
          </table>
        </div>
      </div>
  );
}

export default Filter;
