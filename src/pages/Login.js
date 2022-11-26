import React, { useState } from "react";
import "../styles/Login.css";
import image from "../images/RIICO blanco con nombre sin fondo.png";
import { Toaster } from "react-hot-toast";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import VerifyForm from "../components/VerifyForm";

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
  
  let content = (
    <>
      <SignInForm
        states={{
          email: email,
          setEmail: setEmail,
          password: password,
          setPassword: setPassword,
          onChangeLogin: props.onChangeLogin,
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
            setIsRegistering: setIsRegistering,
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
            setIsShowingSignin: setIsShowingSignin,
            setIsRegistering: setIsRegistering,
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
        </div>
        <div className="login-hr-container">
          <hr
            className={`login-hr ${
              isShowingSignin ? "login-hr--active" : "login-hr--inactive"
            }`}
          />
          <hr
            className={`login-hr ${
              isShowingSignin ? "login-hr--inactive" : "login-hr--active"
            }`}
          />
        </div>
        {content}
      </form>
    </div>
  );
}

export default Login;
