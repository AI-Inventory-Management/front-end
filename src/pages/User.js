import React from "react";
import Navbar from "../components/Navbar";
import "../styles/User.css";

function User() {
  return (
    <div className="us-container">
      <Navbar title="Usuario" />
      <div className="us-info">
        <div className="us-info-container">
          <img
            className="us-info-img"
            alt="imagen de perfil"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png"
          />
          <div className="us-info-text">
            <p>Post Malone</p>
            <p>Vive en USA y trabaja para él</p>
            <div style={{ marginTop: "2rem" }}>
              <button
                style={{
                  padding: "1rem",
                  borderRadius: "13px",
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
