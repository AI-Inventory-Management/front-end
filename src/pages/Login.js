import React, { useState } from "react";
import "../styles/Login.css";
import image from "../images/RIICO blanco con nombre sin fondo.png";
import { Button } from "react-bootstrap";

function Login() {
  const [isShowingSignin, setIsShowingSignin] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Email:${email}, Password: ${password}`);
  };

  let content = (
    <>
      <div className="login-input-container">
        <label className="login-label">Email</label>
        <input onChange={(e)=>{setEmail(e.target.value)}} required type="email" className="login-input" value={email}/>
      </div>
      <div className="login-input-container">
        <label className="login-label">Contraseña</label>
        <input type="password" className="login-input" />
      </div>
      <Button className="login-button" type="submit" onClick = {handleSubmit}>
        Iniciar Sesión
      </Button>
    </>
  );

  if (!isShowingSignin) {
    content = (
      <>
        <div className="login-input-container">
          <label className="login-label">Nombre</label>
          <input required onChange={(e)=>{setName(e.target.value)}} type="text" value={name} className="login-input" />
        </div>
        <div className="login-input-container">
          <label className="login-label">Apellido</label>
          <input onChange={(e)=>{setLastName(e.target.value)}} required type="text" value={lastName} className="login-input" />
        </div>
        <div className="login-input-container">
          <label className="login-label">Email</label>
          <input onChange={(e)=>{setEmail(e.target.value)}} required type="email" value={email} className="login-input" />
        </div>
        <div className="login-input-container">
          <label className="login-label">Contraseña</label>
          <input onChange={(e)=>{setPassword(e.target.value)}} required type="password" value={password} className="login-input" />
        </div>
        <div className="login-input-container">
          <label className="login-label">Confirma tu contraseña</label>
          <input onChange={(e)=>{setConfirmPassword(e.target.value)}} required type="password" value={confirmPassword} className="login-input" />
        </div>
        <Button className="login-button" type="submit" onClick={handleSubmit}>
          Registrarse
        </Button>
      </>
    );
  }

  return (
    <div className="login">
      <div>
        <img src={image} alt = 'riico-logo'className="login-image" />
      </div>
      <form className="login-container">
        <div className="login-switch">
          <p className={`login-title ${isShowingSignin ? "login-title--active":"login-title--inactive"}`} onClick={()=>{setIsShowingSignin(true)}}>Iniciar sesión</p>
          <p className={`login-title ${isShowingSignin ? "login-title--inactive":"login-title--active"}`} onClick={()=>{setIsShowingSignin(false)}}>Registrarse</p>
        </div>
        {content}
      </form>
    </div>
  );
}

export default Login;
