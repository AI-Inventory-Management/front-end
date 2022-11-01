import Navbar from "../components/Navbar";
import "../styles/Filter.css";
import { BiChevronRightSquare } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StoreContext } from "../components/StoreProvider";
import { useContext, useState } from "react";
import Select from "react-select";
import states from "../states.json";
import mun from "../municipality.json";
import toast, { Toaster } from "react-hot-toast";

function Filter() {
  const [, setStoresId, , setStoreName] = useContext(StoreContext); //Selected store info
  const [stores, setStore] = useState([]); //List of stores after the filters

  //Display selects info
  const [selectedState, setSelectedState] = useState(); //Selected state
  const [selectedMun, setSelectedMun] = useState([{ value: "-", label: "" }]); //Selected Municipality
  const [lstMunicupalities, setLstMunicipalities] = useState([
    { value: "-", label: "" },
  ]); //List of municipalities depending on the state

  //Filter data recopilation
  const [status, setStatus] = useState("status"); //Formated status, default "status" to bring all
  const [name, setName] = useState("name"); //Formated name, default "name" to bring all
  const [id, setId] = useState("id_store"); //Formated id, default "id_store" to bring all
  const [state, setState] = useState("state"); //Formated state, default "state" to bring all
  const [municipality, setMunicipality] = useState("municipality"); //Formated municipality, default "municipality" to bring all

  //Selects Changes
  function handleSelectState(data) {
    if (data.label === "") {
      setState("state");
    } else {
      setState(`'` + data.label + `'`);
    }
    setMunicipality("municipality");
    setSelectedState(data);
    setLstMunicipalities(mun[data.label]);
    setSelectedMun([{ value: "-", label: "" }]);
  }
  function handleSelectMun(data) {
    if (data.label === "") {
      setMunicipality("municipality");
      setSelectedMun(data);
    } else {
      setSelectedMun(data);
      setMunicipality(`'` + data.label + `'`);
    }
  }

  //Inputs Changes
  const changeStatus = (event) => {
    setStatus(`'` + event.target.value + `'`);
    if (event.target.value === "") {
      setStatus("status");
    }
  };
  const changeName = (event) => {
    setName(`'` + event.target.value + `'`);
    if (event.target.value === "") {
      setName("name");
    }
  };
  const changeId = (event) => {
    setId(event.target.value);
    if (event.target.value === "") {
      setId("id_store");
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
  const GetStores = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/store/getAllStores?name=${name}&id=${id}&status=${status}&state=${state}&municipality=${municipality}`
    );
    const json = await response.json();
    console.log(json);
    setStore(json);
    toast.success("Busqueda exitosa");
    console.log(id, name, state, status, municipality);
  };

  //Store button
  const SetStoreId = async (id, name) => {
    setStoresId(id);
    setStoreName(name);
  };

  return (
    <div className="filter-container">
      <Navbar title="Inventario de Tienda" />
      <div className="filter-card">
        <p>Llena los campos para poder filtrar el resultado</p>
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
                <td>Nombre:</td>
                <td>
                  <input
                    className="filter-input"
                    name="name"
                    onChange={changeName}
                  />
                </td>
              </tr>
              <tr>
                <td>Estado:</td>
                <td>
                  <div className="filter-select">
                    <Select
                      defaultValue={""}
                      options={states}
                      placeholder=""
                      value={selectedState}
                      onChange={handleSelectState}
                      isSearchable={true}
                      styles={colourStyles}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Municipio:</td>
                <td>
                  <div className="filter-select">
                    <Select
                      defaultValue={""}
                      options={lstMunicupalities}
                      placeholder=""
                      value={selectedMun}
                      onChange={handleSelectMun}
                      isSearchable={true}
                      styles={colourStyles}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>
                  <input
                    className="filter-input"
                    name="Status"
                    onChange={changeStatus}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="filter-button" onClick={GetStores}>
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
                  <th className="filter-titles">Identificador</th>
                  <th className="filter-titles">Nombre</th>
                  <th className="filter-titles">Ver tienda</th>
                </tr>
                <tr>
                  <td>
                    {stores.length !== 0 &&
                      stores.map((Store, index) => (
                        <div className="filter-results">{Store.id_store}</div>
                      ))}
                  </td>
                  <td>
                    {stores.length !== 0 &&
                      stores.map((Store, index) => (
                        <div className="filter-results">{Store.name}</div>
                      ))}
                    {stores.length === 0 && (
                      <p className="no-stores">No se encontraron tiendas</p>
                    )}
                  </td>
                  <td>
                    {stores.length !== 0 &&
                      stores.map((store, index) => (
                        <div className="filter-results">
                          <Link to={`/mapa/${store.id_store}`}>
                            <BiChevronRightSquare
                              className="filter-show"
                              key={store.id}
                              onClick={() => SetStoreId(store.id, store.name)}
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

export default Filter;
