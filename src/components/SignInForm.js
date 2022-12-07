/*
SignInForm.js
Autores:
- Edna Jacqueline Zavala Ortega 

Descripción: Componente que conforma el formulario para iniciar sesión.
*/

import React from "react";
import { Button } from "react-bootstrap";
import "../styles/SignInForm.css";

export default function SignInForm(props) {


  return (
    <>
      <div className="signin-input-container">
        <label className="signin-label">Email</label>
        <input
          onChange={(e) => {
            props.states.setEmail(e.target.value);
          }}
          required
          type="email"
          className="signin-input"
          value={props.states.email}
        />
      </div>
      <div className="signin-input-container">
        <label className="signin-label">Contraseña</label>
        <input
          onChange={(e) => {
            props.states.setPassword(e.target.value);
          }}
          required
          type="password"
          className="signin-input"
          value={props.states.password}
        />
      </div>
      <Button className="signin-button" type="submit" onClick={props.states.handleSignIn}>
        Iniciar Sesión
      </Button>
    </>
  );
}
