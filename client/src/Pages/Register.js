import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [registerSuccess, setRegisterSuccess] = React.useState(true);
  const userRef = React.useRef();
  const passwordRef = React.useRef();
  const emailRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await fetch("http://127.0.0.1:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const userAdded = await res.json();
      console.log(userAdded);
      if (userAdded._id) {
        setRegisterSuccess(true);
        window.location.replace("/login");
      } else {
        setRegisterSuccess(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Register</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="loginFormLabel">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label className="loginFormLabel">Email</label>
        <input
          type="email"
          className="loginInput"
          placeholder="Enter your username..."
          ref={emailRef}
        />
        <label className="loginFormLabel">Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <Link className="linkRegister" to="/login">
          Already have an account
        </Link>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      {!registerSuccess && (
        <span style={{ margin: "25px", color: "red", fontSize: "25px" }}>
          Something is wrong, Try choosing different email / username
        </span>
      )}
    </div>
  );
}
