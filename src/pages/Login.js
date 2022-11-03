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
          <h1>Login</h1>
          <Card.Body>
            <form onSubmit={handleSubmit}>
            
              <label>
              <h3>Username</h3>
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
                <h3>Password</h3>
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
              <Button className="login-button" type="submit">Login</Button>
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
