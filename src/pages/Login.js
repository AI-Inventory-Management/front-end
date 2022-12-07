/*
Login.js
Autores:
- Edna Jacqueline Zavala Ortega 

Descripción: Página que incluye los formularios para iniciar sesión y registrarse.
*/

import React, { useState } from "react";
import "../styles/Login.css";
import image from "../images/RIICO blanco con nombre sin fondo.png";
import toast, { Toaster } from "react-hot-toast";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import VerifyForm from "../components/VerifyForm";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function Login(props) {

  const [isShowingSignin, setIsShowingSignin] = useState(true);  // Conocer si el usuario está iniciando sesión
  const [isRegistering, setIsRegistering] = useState(false);  // Conocer si el usuario se está registrando y mostrar el formulario de verificación

  // Estados para extraer los valores de los campos de texto del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Constante para navegar a otras rutas de la aplicación 
  const navigate = useNavigate();

  // Handler de Sign Up
  const handleSignUp = (event) => {
    // Se verifica que la confirmación de contraseña del formulario de registro coincida con el otro campo
    if (password !== confirmPassword) {
      toast.error("Passwords must match.");
      return;
    }

    // Verificar que el formulario no se encuentre vacío e impedir su envío vacío
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      confirmPassword === ""
    ) {
      return;
    }

    // Crear los headers para enviar la información y el token de sesión
    const myHeadersToken = new Headers();
      myHeadersToken.append("Content-Type", "application/json");
      myHeadersToken.append(
        "Authorization",
        `Bearer ${window.sessionStorage.getItem("bearerToken")}`
      );

    // Construir el JSON  
    const signUpJSON = JSON.stringify({
      first_name: name,
      last_name: lastName,
      password: password,
      email: email,
      phone_number: `+52${phoneNumber}`,
      role: "LOGISTICS",
      profile_picture: "",
    });

    // Definir las opciones de la petición
    const requestOptions = {
      method: "POST",
      headers: myHeadersToken,
      body: signUpJSON,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          result.errors.map((error) => toast.error(error.msg));
          return;
        }
        setIsRegistering(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Iniciar sesión
  const handleSignIn = (event) => {
    if (email === "" || password === "") {
      return;
    }


    const myHeadersToken = new Headers();
      myHeadersToken.append("Content-Type", "application/json");
      myHeadersToken.append(
        "Authorization",
        `Bearer ${window.sessionStorage.getItem("bearerToken")}`
      );
  
    // Construir el JSON  
    const signInJSON = JSON.stringify({
      email: email,
      password: password,
    });

    // Definir las opciones de la petición
    const requestOptions = {
      method: "POST",
      headers: myHeadersToken,
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
          window.sessionStorage.setItem("email", email);
          window.sessionStorage.setItem("isLoggedIn", true);
          window.sessionStorage.setItem("role", userData.role);
          window.sessionStorage.setItem("bearerToken", userData.AccessToken);
          // Hide sidebar and redirect
          props.onChangeLogin(true);
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

  // Verificación
  const handleVerifyEmail = (event) => {
    const myHeadersToken = new Headers();
      myHeadersToken.append("Content-Type", "application/json");
      myHeadersToken.append(
        "Authorization",
        `Bearer ${window.sessionStorage.getItem("bearerToken")}`
      );

    // Construir el JSON  
    const signUpJSON = JSON.stringify({
      email: email,
      code: verificationCode,
    });

    // Definir las opciones de la petición
    const requestOptions = {
      method: "POST",
      headers: myHeadersToken,
      body: signUpJSON,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Verified succesfully:", result);
        setIsShowingSignin(true);
        setIsRegistering(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Variable que permite reemplazar el contenido de acuerdo al estado isShowingSignIn
  let content = (
    <>
      <SignInForm
        states={{
          email: email,
          setEmail: setEmail,
          password: password,
          setPassword: setPassword,
          handleSignIn: handleSignIn,
        }}
      />
    </>
  );

  // Si no se muestra sign in debe mostrarse sign up
  if (!isShowingSignin) {
    content = (
      <>
        <SignUpForm
          states={{
            email: email,
            setEmail: setEmail,
            password: password,
            setPassword: setPassword,
            confirmPassword: confirmPassword,
            setConfirmPassword: setConfirmPassword,
            name: name,
            setName: setName,
            lastName: lastName,
            setLastName: setLastName,
            phoneNumber: phoneNumber,
            setPhoneNumber: setPhoneNumber,
            handleSignUp: handleSignUp,
          }}
        />
      </>
    );
  }

  // Formulario de verificación
  if (isRegistering) {
    content = (
      <>
        <VerifyForm
          states={{
            email: email,
            verificationCode: verificationCode,
            setVerificationCode: setVerificationCode,
            handleVerifyEmail: handleVerifyEmail,
          }}
        />
      </>
    );
  }

  return (
    <div className="login">
      <Toaster />
      <div>
        <img src={image} alt="riico-logo" className="login-image" />
      </div>
      <form className="login-container" onSubmit={(e) => e.preventDefault()}>
        <div className="login-switch">
          <p
            className={`login-title ${
              isShowingSignin ? "login-title--active" : "login-title--inactive"
            }`}
            onClick={() => {
              setIsShowingSignin(true);
              setName("");
              setLastName("");
              setEmail("");
              setPhoneNumber("");
              setPassword("");
              setConfirmPassword("");
              setVerificationCode("");
              setIsRegistering(false);
            }}
          >
            Iniciar sesión
          </p>
          <p
            className={`login-title ${
              isShowingSignin ? "login-title--inactive" : "login-title--active"
            }`}
            onClick={() => {
              setIsShowingSignin(false);
              setName("");
              setLastName("");
              setEmail("");
              setPhoneNumber("");
              setPassword("");
              setConfirmPassword("");
              setVerificationCode("");
              setIsRegistering(false);
            }}
          >
            Registrarse
          </p>
          <div
            className={`login-border ${
              isShowingSignin ? "login-border--left" : "login-border--right"
            }`}
          />
        </div>
        {content}
      </form>
    </div>
  );
}

export default Login;
