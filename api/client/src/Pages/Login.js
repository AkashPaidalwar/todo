import React from "react";
import "./Login.css";
import { userContext } from "../Context/Context";
import { Link } from "react-router-dom";

export default function Login() {
  const userRef = React.useRef();
  const passwordRef = React.useRef();
  const { setUser } = React.useContext(userContext);
  const [loginSuccess, setLoginSuccess] = React.useState(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        username: userRef.current.value,
      };
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const userFound = await res.json();
      if (userFound[0]._id) {
        if (userFound[0].password !== passwordRef.current.value) {
          setLoginSuccess(false);
        } else {
          setUser(userFound[0]);
          setLoginSuccess(true);
          window.location.replace("/");
        }
      } else {
        setLoginSuccess(false);
      }
    } catch (err) {
      console.log(err);
      setLoginSuccess(false);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginFormLabel">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label className="loginFormLabel">Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
        <Link className="loginLink" to="/register">
          Create new account
        </Link>
      </form>
      {!loginSuccess && (
        <span style={{ margin: "25px", color: "red", fontSize: "25px" }}>
          Incorrect Username or Password
        </span>
      )}
    </div>
  );
}
