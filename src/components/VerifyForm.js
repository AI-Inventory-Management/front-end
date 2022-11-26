import React from "react";
import { Button } from "react-bootstrap";
import "../styles/VerifyForm.css";

export default function VerifyForm(props) {
  const handleVerifyEmail = (event) => {
    //event.preventDefault();

    const signUpHeaders = new Headers();
    signUpHeaders.append("Content-Type", "application/json");

    const signUpJSON = JSON.stringify({
      email: props.states.email,
      code: props.states.verificationCode,
    });

    const requestOptions = {
      method: "POST",
      headers: signUpHeaders,
      body: signUpJSON,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Verified succesfully:", result);
        props.states.setIsShowingSignin(true);
        props.states.setIsRegistering(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        onClick={handleVerifyEmail}
      >
        Registrarse
      </Button>
    </>
  );
}
