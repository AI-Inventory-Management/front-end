import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/User.css";
import femaleImage from "../images/user/mujerEjecutiva.jpg";
import maleImage from "../images/user/hombreEjecutivo.jpg";

function User(props) {
  const [isFemale, setIsFemale] = useState(true);
  const firstName = window.sessionStorage.getItem("firstName");
  const lastName = window.sessionStorage.getItem("lastName");
  const role = window.sessionStorage.getItem("role");
  const email = window.sessionStorage.getItem("email");

  const navigate = useNavigate();

  const onSignOut = () => {
    window.sessionStorage.removeItem("isLoggedIn");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("bearerToken");
    props.onChangeLogin(false);
    navigate("/");
  };

  const getNameGender = () => {
    const gender = localStorage.getItem("gender");
    if (gender) {
      if (gender === "male") {
        setIsFemale(false);
      }
      return;
    }
  };

  const getRoleStr = (role) => {
    const gender = localStorage.getItem("gender");
    if (gender === "male") return role;

    if (role === "SUPERVISOR") return "SUPERVISORA";
    return "LOGISITICA";
  };

  useEffect(() => {
    getNameGender();
  });

  return (
    <div className="us-container">
      <Navbar title="Usuario" />
      <div className="us-info">
        <div className="us-info-container">
          <img
            className="us-info-img"
            alt="user"
            src={isFemale ? femaleImage : maleImage}
          />
          <div className="us-info-text">
            <p className="us-info-role">
              {getRoleStr(role).charAt(0).toUpperCase() +
                getRoleStr(role).slice(1)}
            </p>
            <p className="us-info-name">{firstName + " " + lastName}</p>
            <p className="us-info-email">{email}</p>
            <div style={{ marginTop: "2rem" }}>
              <button className="us-info-button" onClick={onSignOut}>
                Cerrar sesi??n
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
