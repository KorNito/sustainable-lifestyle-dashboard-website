import React, { useState, useContext } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
  const auth = getAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, data.email, data.password);
    setCurrentUser(data.email);
    localStorage.setItem("user", JSON.stringify(data.email));
  };

  return (
    <div class="login-page">
      <div class="form">
        <form class="login-form" onSubmit={login}>
          <input
            type="email"
            placeholder="email"
            onChange={(event) => handleInputs(event)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => handleInputs(event)}
          />
          <button>login</button>
          <p class="message">
            Not registered? <a href="#">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
