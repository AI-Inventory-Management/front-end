import Navbar from "../components/Navbar";
import "../styles/Filter.css";
import { BiChevronRightSquare } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StoreContext } from "../components/StoreProvider";
import { useContext, useState } from "react";
import Select from "react-select";
import states from "../states.json"
import mun from "../municipality.json"

function Filter() {
  const [, setStoresId, , setStoreName] = useContext(StoreContext);
  const [selectedState, setSelectedState] = useState();
  const [selectedMun, setSelectedMun] = useState();
  const [stores, setStore] = useState([])
  const [lstMunicupalities, setLstMunicipalities] = useState(["-"])
  const [status, setStatus] = useState("status");
  const [name, setName] = useState("name");
  const [id, setId] = useState("id_store");
  const [state, setState] = useState("state");
  const [municipality, setMunicipality] = useState("municipality");
  
  //Select Changes
  function handleSelectState(data) {
    setSelectedState(data);
    setLstMunicipalities(mun[data.label])
    setState(`'` + data.label + `'`)
  }

  function handleSelectMun(data) {
    setSelectedMun(data);
    setMunicipality(`'` + data.label + `'`);
  }

  //Inputs Changes
  const changeStatus = (event) => {
    setStatus(`'` + event.target.value + `'`);
  };
  const changeName = (event) => {
    setName(`'` + event.target.value + `'`);
  };
  const changeId = (event) => {
    setId(event.target.value);
  };

  const colourStyles = {
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? "black" : styles.color,
      backgroundColor: state.isSelected ? "#d3d3d3" : styles.color,
      borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
      "&:hover": {
        color: "black",
        backgroundColor: "#d3d3d3"
      }
    }),
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "#d3d3d3",
      boxShadow: state.isFocused ? "#d3d3d3" : 0,
      borderColor: state.isFocused ? "#d3d3d3" : "#d3d3d3",
      "&:hover": {
        borderColor: state.isFocused ? "#d3d3d3" : "#CED4DA"
      }
    })
  };

  const GetStores = async () =>{
    const response = await fetch(`http://localhost:8080/store/getAllStores?name=${name}&id=${id}status=${status}&state=${state}&municipality=${municipality}`)
    const json = await response.json()
    setStore(json)
    console.log(id,name,state,status,municipality)
  }

  const SetStoreId = async (id, name) => {
    setStoresId(id);
    setStoreName(name);
  };

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
            <tr className="filter-lable">Status:</tr>
          </td>
          <td>
            <tr>
              <input className="filter-input" name="Id" onChange={changeId}/>
            </tr>
            <tr>
              <input className="filter-input" name="name" onChange={changeName}/>
            </tr>
            <tr>
              <div className="filter-select">
                <Select
                  defaultValue={""}
                  options={states}
                  placeholder="-"
                  value={selectedState}
                  onChange={handleSelectState}
                  isSearchable={true}
                  styles={colourStyles}
                />
              </div>
            </tr>
            <tr>
            <div className="filter-select">
                <Select
                  defaultValue={""}
                  options={lstMunicupalities}
                  placeholder="-"
                  value={selectedMun}
                  onChange={handleSelectMun}
                  isSearchable={true}
                  styles={colourStyles}
                />
              </div>
            </tr>
            <tr>
              <input className="filter-input" name="Status" onChange={changeStatus}/>
            </tr>
            <tr>
              <button className="filter-button" onClick={GetStores}>Buscar</button>
            </tr>
          </td>
          <td className="filter">
            <table className="filter-results">
              <td className="filter-results-td">
                <th className="filter-th">Identificador</th>
                {stores.map((Store, index) => (
                  <tr className="filter-tr">{Store.id}</tr>
                ))}
              </td>
              <td className="filter-results-td">
                <th className="filter-th">Nombre</th>
                {stores.map((Store, index) => (
                  <tr className="filter-tr">
                    <p className="filter-p">{Store.name}</p>
                  </tr>
                ))}
                {stores.length === 0 && (
                  <p className="no-stores">No se encontraron tiendas</p>
                )}
              </td>
              <td className="filter-results-td">
                <th className="filter-th">Ver tienda</th>
                {stores.map((store, index) => (
                  <tr className="filter-tr">
                    <Link to="/tiendas">
                      <BiChevronRightSquare
                        className="filter-show"
                        key={store.id}
                        onClick={() => SetStoreId(store.id, store.name)}
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
