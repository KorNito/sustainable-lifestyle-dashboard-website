import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const auth = getAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password);
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
      <button onClick={createUser}>Register</button>
    </div>
  );
};

export default SignUp;
