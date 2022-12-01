import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { AdminSidebarData, SupervisorSidebarData } from "./SidebarData";
import logo from "../images/logo/RIICO blanco sin nombre sin fondo.png";
import femaleImage from "../images/user/mujerEjecutiva.jpg";
import maleImage from "../images/user/hombreEjecutivo.jpg";

function Sidebar() {
  const navigate = useNavigate();
  const [isFemale, setIsFemale] = useState(true);
  const firstName = window.sessionStorage.getItem("firstName");
  const lastName = window.sessionStorage.getItem("lastName");

  const getNameGender = () => {
    // Select only one name in case it contains more than one
    const name = firstName.split(" ");
    fetch(`https://api.genderize.io/?name=${name[0]}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.gender === "male") {
          setIsFemale(false);
          localStorage.setItem("gender", "male");
        } else {
          localStorage.setItem("gender", "female");
        }
      });
  };

  useEffect(() => {
    getNameGender();
  });

  return (
    <div className="sb-sidebar">
      <ul className="sb-ul">
        <div className="sb-img-container">
          <Link to="/">
            <img className="sb-user-img" alt="imagen de perfil" src={logo} />
          </Link>
        </div>
        <Link className="sd-user" to="/usuario">
          <li className="sd-user-li">
            <img
              src={isFemale ? femaleImage : maleImage}
              style={{ width: "3em", borderRadius: "50%" }}
              alt="user"
            />
            <p>{firstName + " " + lastName}</p>
          </li>
        </Link>
        {window.sessionStorage.getItem("role") === "SUPERVISOR" &&
          AdminSidebarData.map((val, key) => {
            return (
              <Link key={key} className="sb-option" to={val.link}>
                <li className="sb-option-li">
                  {val.icon}
                  <p className="sb-option-title">{val.title}</p>
                </li>
              </Link>
            );
          })}
        {window.sessionStorage.getItem("role") === "LOGISTICS" &&
          SupervisorSidebarData.map((val, key) => {
            return (
              <Link key={key} className="sb-option" to={val.link}>
                <li className="sb-option-li">
                  {val.icon}
                  <p className="sb-option-title">{val.title}</p>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default Sidebar;
