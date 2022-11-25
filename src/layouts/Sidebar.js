import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { SidebarData } from "./SidebarData";
import logo from "../images/logo/RIICO logo.png";
import femaleImage from "../images/user/mujerEjecutiva.jpg";
import maleImage from "../images/user/hombreEjecutivo.jpg";

function Sidebar() {
  const [isFemale, setIsFemale] = useState(true);
  const firstName = window.localStorage.getItem("firstName");
  const lastName = window.localStorage.getItem("lastName");

  const getNameGender = () => {
    fetch(`https://api.genderize.io/?name=${firstName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.gender === "male") {
          setIsFemale(false);
        }
      });
  };

  useEffect(() => {
    getNameGender();
    console.log("aa");
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
            {/* <div className="sd-user-li-letter">P</div> */}
            <img
              src={isFemale ? femaleImage : maleImage}
              style={{ width: "3em", borderRadius: "50%" }}
              alt="user"
            />
            <p>{firstName + " " + lastName}</p>
          </li>
        </Link>
        {SidebarData.map((val, key) => {
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
