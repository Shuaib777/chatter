import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/authContext";
import { PopupContext } from "../context/popupContext";

const Navbar = ({ handleCloseSidebar }) => {
  const { dispatch } = useContext(PopupContext);
  const screenWidth = window.screen.width;

  const { currentUser } = useContext(AuthContext);
  const handleOpen = () =>
    dispatch({ type: "CHANGE_STATE", payload: true, id: "currentUser" });
  return (
    <div className="navbar">
      {screenWidth <= 1200 && (
        <span className="hamburger" onClick={handleCloseSidebar}>
          ☰
        </span>
      )}
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
