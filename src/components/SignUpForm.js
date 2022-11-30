import React from "react";
import { Button } from "react-bootstrap";
import "../styles/SignUpForm.css"

export default function SignUpForm(props) {
  return (
    <>
      <div className="signup-input-container">
        <label className="signup-label">Nombre(s)</label>
        <input
          required
          onChange={(e) => {
            props.states.setName(e.target.value);
          }}
          type="text"
          value={props.states.name}
          className="signup-input"
        />
      </div>
      <div className="signup-input-container">
        <label className="signup-label">Apellido(s)</label>
        <input
          onChange={(e) => {
            props.states.setLastName(e.target.value);
          }}
          required
          type="text"
          value={props.states.lastName}
          className="signup-input"
        />
      </div>
      <div className="signup-input-container">
        <label className="signup-label">Email</label>
        <input
          onChange={(e) => {
            props.states.setEmail(e.target.value);
          }}
          required
          type="email"
          value={props.states.email}
          className="signup-input"
        />
      </div>
      <div className="signup-input-container">
        <label className="signup-label">Teléfono</label>
        <input
          onChange={(e) => {
            props.states.setPhoneNumber(e.target.value);
          }}
          required
          type="text"
          pattern="[0-9]{10}"
          size="10"
          value={props.states.phoneNumber}
          className="signup-input"
        />
      </div>
      <div className="signup-input-container">
        <label className="signup-label">Contraseña</label>
        <input
          onChange={(e) => {
            props.states.setPassword(e.target.value);
          }}
          required
          type="password"
          value={props.states.password}
          className="signup-input"
        />
      </div>
      <div className="signup-input-container">
        <label className="signup-label">Confirma tu contraseña</label>
        <input
          onChange={(e) => {
            props.states.setConfirmPassword(e.target.value);
          }}
          required
          type="password"
          value={props.states.confirmPassword}
          className="signup-input"
        />
      </div>
      <Button className="signup-button" type="submit" onClick={props.states.handleSignUp}>
        Continuar
      </Button>
    </>
  );
}
