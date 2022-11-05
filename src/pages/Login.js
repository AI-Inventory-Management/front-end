import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleInputChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Username:${loginForm.username}, Password: ${loginForm.password}`);
  };

  const handleClickShowPassword = () => {
    setLoginForm({
      ...loginForm,
      showPassword: !loginForm.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-background">
      <div>
        <br/>
        <Card className="login-container">
          <p className="login-title">Login</p>
          <br/>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <label>
              <p className="login-text">Username</p>
                <input
                  required
                  type="text"
                  className="login-input"
                  name="username"
                  value={loginForm.username || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <p className="login-text">Password</p>
                <input
                  required
                  className="login-input"
                  type="password"
                  name="password"
                  value={loginForm.password || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <Link className="login-link"> Forgot Password?</Link>
              <Button className="login-button" type="submit">Login</Button>
              <br/>
            </form>
          </Card.Body>
        </Card>
        <p className="login-signup">Don't have an account? <Link style={{color: "rgb(130,42,38)"}}>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
