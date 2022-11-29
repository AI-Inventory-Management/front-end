import React from "react";
import { Button } from "react-bootstrap";
import "../styles/VerifyForm.css";

export default function VerifyForm(props) {
  return (
    <>
      <div className="verify-input-container">
        <p>Ingresa el código de verificación que mandamos al correo: </p>
        <p>{props.states.email}</p>
        <label className="verify-label">Código de 6 dígitos</label>
        <input
          required
          onChange={(e) => {
            props.states.setVerificationCode(e.target.value);
          }}
          type="text"
          value={props.states.verificationCode}
          className="verify-input"
          size="6"
        />
      </div>
      <Button
        className="verify-button"
        type="submit"
        onClick={props.states.handleVerifyEmail}
      >
        Registrarse
      </Button>
    </>
  );
}
