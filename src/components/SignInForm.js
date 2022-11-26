import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/SignInForm.css";

export default function SignInForm(props) {
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    if (props.states.email === "" || props.states.password === "") {
      return;
    }

    //event.preventDefault();

    const signInHeaders = new Headers();
    signInHeaders.append("Content-Type", "application/json");

    const signInJSON = JSON.stringify({
      email: props.states.email,
      password: props.states.password,
    });

    const requestOptions = {
      method: "POST",
      headers: signInHeaders,
      body: signInJSON,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signin`, requestOptions)
      .then((response) => response.json())
      .then(function (userData) {
        if (!userData.errors) {
          console.log("Success:", userData);
          window.sessionStorage.setItem("firstName", userData.first_name);
          window.sessionStorage.setItem("lastName", userData.last_name);
          window.sessionStorage.setItem(
            "profilePicture",
            userData.profile_picture
          );
          window.sessionStorage.setItem("email", props.states.email);
          window.sessionStorage.setItem("isLoggedIn", true);
          window.sessionStorage.setItem("role", userData.role);
          window.sessionStorage.setItem("bearerToken", userData.AccessToken);
          // Hide sidebar and redirect
          props.states.onChangeLogin(true);
          navigate("/");
          return;
        }
        console.log(userData.errors);
        userData.errors.map((error) => toast.error(error.msg));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
      <Button className="signin-button" type="submit" onClick={handleSignIn}>
        Iniciar Sesión
      </Button>
    </>
  );
}
