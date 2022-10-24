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
      <div className="login-background-cover">
        <br/>
        <Card className="login-container">
          <Card.Img
            className="login-logo"
            variant="top"
            src={require(`../images/Riico-logo.png`)}
          />
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  required
                  type="text"
                  className="login-input"
                  placeholder="Username"
                  name="username"
                  value={loginForm.username || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                <input
                  required
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginForm.password || ""}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <Button className="login-button" type="submit">Log in</Button>
              <br/>
              <Link className="login-link"> Forgot Password?</Link>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Login;
