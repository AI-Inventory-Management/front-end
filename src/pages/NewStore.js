import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/NewStore.css";
import "../styles/Filter.css";
import Select from "react-select";
import states from "../states.json";
import mun from "../municipality.json";
import { Link } from "react-router-dom";

function NewStore() {
  //Display selects info
  const [selectedState, setSelectedState] = useState(); //Selected state
  const [selectedMun, setSelectedMun] = useState(); //Selected Municipality
  const [lstMunicupalities, setLstMunicipalities] = useState(["-"]); //List of municipalities depending on the state

  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [state, setState] = useState();
  const [municipality, setMunicipality] = useState();

  //Selects Changes
  function handleSelectState(data) {
    setSelectedState(data);
    setLstMunicipalities(mun[data.label]);
    setState(`'` + data.label + `'`);
  }
  function handleSelectMun(data) {
    setSelectedMun(data);
    setMunicipality(`'` + data.label + `'`);
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

  const AddStore = async () => {
    console.log("Hola");
  };

  return (
    <div className="NewStore-container">
      <Navbar title="Añadir Tienda" />
      <div className="NewStore-card">
        <p>Llena los campos para crear una nueva tienda</p>
        <table className="NewStore-table">
          <td className="filter-results-td">
            <tr className="filter-lable">Identificador:</tr>
            <tr className="filter-lable">Nombre:</tr>
            <tr className="filter-lable">Estado:</tr>
            <tr className="filter-lable">Municipio:</tr>
            <tr className="filter-lable">Status:</tr>
          </td>
          <td>
            <tr>
              <input className="filter-input" name="Id" onChange={changeId} />
            </tr>
            <tr>
              <input
                className="filter-input"
                name="name"
                onChange={changeName}
              />
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
              <input
                className="filter-input"
                name="Status"
                onChange={changeStatus}
              />
            </tr>
          </td>
          <td>
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
                  <input
                    className="filter-input"
                    name="Id"
                    onChange={changeId}
                  />
                </tr>
                <tr>
                  <input
                    className="filter-input"
                    name="name"
                    onChange={changeName}
                  />
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
                  <input
                    className="filter-input"
                    name="Status"
                    onChange={changeStatus}
                  />
                </tr>
              </td>
            </table>
          </td>
        </table>
        <button className="filter-button" onClick={AddStore}>
          Añadir
        </button>
      </div>
    </div>
  );
}

export default NewStore;
