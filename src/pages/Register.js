import React from 'react';
import Add from '../image/addAvatar.png'

const Register = () => {
  return (
   <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Chatter</span>
      <span className="title">Register</span>
      <form>
        <input type="text" placeholder='Name'/>
        <input type="email" placeholder='Email'/>
        <input type="password" placeholder='Password' />
        <input style={{display: "none"}} type="file" id="file"/>
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add an avatar</span>
        </label>
        <button>Sign up</button>
        <p>Already a member? Login</p>
      </form>
    </div>
   </div>
  )
}

export default Register;