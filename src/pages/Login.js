import React, { useState } from "react";
import "../styles/Login.css";
import image from "../images/RIICO blanco con nombre sin fondo.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login(props) {
  const [isShowingSignin, setIsShowingSignin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    if (email === "" || password === "") {
      return;
    }

    //event.preventDefault();

    const signInHeaders = new Headers();
    signInHeaders.append("Content-Type", "application/json");

    const signInJSON = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: signInHeaders,
      body: signInJSON,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signin`, requestOptions)
      .then((response) => response.json())
      .then(function(userData) {
        if (!userData.errors){
          console.log("Success:", userData);
          window.localStorage.setItem("firstName", userData.first_name);
          window.localStorage.setItem("lastName", userData.last_name);
          window.localStorage.setItem(
            "profilePicture",
            userData.profile_picture
          );
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("role", userData.role);
          window.localStorage.setItem("bearerToken", userData.AccessToken);
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

  const handleSignUp = (event) => {
    if (password !== confirmPassword) {
      toast.error("Passwords must match.")
      //event.preventDefault();
      return; 
    }

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
    //event.preventDefault();


    const signUpHeaders = new Headers();
    signUpHeaders.append("Content-Type", "application/json");

    const signUpJSON = JSON.stringify({
      first_name: name,
      last_name: lastName,
      password: password,
      email: email,
      phone_number: `+52${phoneNumber}`,
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
        setIsRegistering(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleVerifyEmail = (event) => {
    //event.preventDefault();

    const signUpHeaders = new Headers();
    signUpHeaders.append("Content-Type", "application/json");

    const signUpJSON = JSON.stringify({
      email: email,
      code: verificationCode,
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
        setIsShowingSignin(true);
        setIsRegistering(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let content = (
    <>
      <div className="login-input-container">
        <label className="login-label">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          type="email"
          className="login-input"
          value={email}
        />
      </div>
      <div className="login-input-container">
        <label className="login-label">Contraseña</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          type="password"
          className="login-input"
          value={password}
        />
      </div>
      <Button className="login-button" type="submit" onClick={handleSignIn}>
        Iniciar Sesión
      </Button>
    </>
  );

  if (!isShowingSignin) {
    content = (
      <>
        <div className="login-input-container">
          <label className="login-label">Nombre</label>
          <input
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Apellido</label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
            type="text"
            value={lastName}
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            value={email}
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Teléfono</label>
          <input
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            required
            type="text"
            pattern="[0-9]{10}"
            size="10"
            value={phoneNumber}
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Contraseña</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            value={password}
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Confirma tu contraseña</label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
            type="password"
            value={confirmPassword}
            className="login-input"
          />
        </div>
        <Button className="login-button" type="submit" onClick={handleSignUp}>
          Continuar
        </Button>
      </>
    );
  }

  if (isRegistering) {
    content = (
      <>
        <div className="login-input-container">
          <p>Ingresa el código de verificación que mandamos al correo: </p>
          <p>{email}</p>
          <label className="login-label">Código de 6 dígitos</label>
          <input
            required
            onChange={(e) => {
              setVerificationCode(e.target.value);
            }}
            type="text"
            value={verificationCode}
            className="login-input"
            size="6"
          />
        </div>
        <Button
          className="login-button"
          type="submit"
          onClick={handleVerifyEmail}
        >
          Registrarse
        </Button>
      </>
    );
  }

  return (
    <div className="login">
      <Toaster />
      <div>
        <img src={image} alt="riico-logo" className="login-image" />
      </div>
      <form className="login-container" onSubmit={(e)=>e.preventDefault()}>
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
        </div>
        <div className="login-hr-container">
          <hr className={`login-hr ${
              isShowingSignin ? "login-hr--active" : "login-hr--inactive"
            }`}/>
          <hr className={`login-hr ${
              isShowingSignin ? "login-hr--inactive" : "login-hr--active"
            }`}/>
        </div>
        
        {content}
      </form>
    </div>
  );
}

export default Login;
