import React, { useState, useContext } from "react";
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
    <div>
      <input
        placeholder="Email"
        name="email"
        type="email"
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        onChange={(event) => handleInputs(event)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
