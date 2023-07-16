import React from 'react';

const Login = () => {
  return (
   <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Chatter</span>
      <span className="title">Register</span>
      <form>
        <input type="email" placeholder='Email'/>
        <input type="password" placeholder='Password' />
        <button>Sign in</button>
        <p>Not a member? Register</p>
      </form>
    </div>
   </div>
  )
}

export default Login;