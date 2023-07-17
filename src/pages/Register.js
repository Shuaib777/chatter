import React, { useState } from "react";
import Add from "../image/addAvatar.png";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const displayName =  e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].value[0];

    if (displayName === "") {
      setErr(() => "Name field cannot be empty");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error.message.substring(
        22,
        error.message.length - 2
      );
      setErr(() => errorMessage);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatter</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name"/>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <input style={{ display: "none" }} type="file" id="file"/>
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span style={{ color: "red" }}>{err}!!</span>}
          <p>Already a member? Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
