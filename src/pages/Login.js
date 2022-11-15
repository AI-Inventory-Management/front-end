import React from "react";
import "../styles/Login.css";
import image from '../images/Riico-logo.png'

function Login() {
  const inputInfo = [
    { name: "Nombre", type: "text" },
    { name: "Apellido", type: "text" },
    { name: "Email", type: "email" },
    { name: "Password", type: "password" },
  ];

  return (
    <div className="login">
      <div>
        <img src={image} className='login-image'/>
      </div>
      <div className="login-container">
        <p className="login-title"> Login</p>
        {inputInfo.map((element) => {
          return (
            <div className="login-input-container">
              <label className="login-label">{element.name}</label>
              <input required type={element.type} className="login-input" />
            </div>
          );
        })}
        <button className="login-button" type="submit">
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Login;
