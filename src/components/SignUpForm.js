import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import "../styles/SignUpForm.css"

export default function SignUpForm(props) {
  const handleSignUp = (event) => {
    if (props.states.password !== props.states.confirmPassword) {
      toast.error("Passwords must match.");
      //event.preventDefault();
      return;
    }

    if (
      props.states.email === "" ||
      props.states.password === "" ||
      props.states.name === "" ||
      props.states.lastName === "" ||
      props.states.phoneNumber === "" ||
      props.states.confirmPassword === ""
    ) {
      return;
    }
    //event.preventDefault();

    const signUpHeaders = new Headers();
    signUpHeaders.append("Content-Type", "application/json");

    const signUpJSON = JSON.stringify({
      first_name: props.states.name,
      last_name: props.states.lastName,
      password: props.states.password,
      email: props.states.email,
      phone_number: `+52${props.states.phoneNumber}`,
      role: "LOGISTICS",
      profile_picture: "",
    });

    const requestOptions = {
      method: "POST",
      headers: signUpHeaders,
      body: signUpJSON,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log("Success:", result);
        if (result.errors) {
          result.errors.map((error) => toast.error(error.msg));
          return;
        }
        props.states.setIsRegistering(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log('VERIFICANDING', props.states.email, props.states.password);
  return (
    <>
      <div className="signup-input-container">
        <label className="signup-label">Nombre</label>
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
        <label className="signup-label">Apellido</label>
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
      <Button className="signup-button" type="submit" onClick={handleSignUp}>
        Continuar
      </Button>
    </>
  );
}
