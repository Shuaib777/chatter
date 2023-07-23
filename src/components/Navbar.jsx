import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/authContext";
import { PopupContext } from "../context/popupContext";

const Navbar = () => {
  const { dispatch } = useContext(PopupContext);

  const { currentUser } = useContext(AuthContext);
  const handleOpen = () => dispatch({ type: "CHANGE_STATE", payload: true });
  return (
    <div className="navbar">
      <div className="logo">Chatter</div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" onClick={() => handleOpen()} />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
