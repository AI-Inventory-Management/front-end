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

  const handleSignUp = (event) => {
    if (password !== confirmPassword) {
      toast.error("Passwords must match.");
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
