import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
// import { setDoc, doc } from "firebase/firestore";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');

    } catch (error) { 
      const errorMessage = error.message.substring(22, error.message.length - 2);
      setErr(() => errorMessage);
    }
  };

  return (
   <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Chatter</span>
      <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email'/>
        <input type="password" placeholder='Password' />
        <button>Sign in</button>
        <p>Not a member?<Link to="/register">Register</Link></p>
        {err && <span style={{ color: "red" }}>{err}!!</span>}
      </form>
    </div>
   </div>
  )
}

export default Login;