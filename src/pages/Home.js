import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Popup from "../components/Popup";
import { PopupContext } from "../context/popupContext";

const Home = () => {
  const { popupState } = useContext(PopupContext);
  return (
    <div className="home">
      <div className="container">
        <Sidebar></Sidebar>
        <Chat></Chat>
        {popupState.isOpen && <Popup></Popup>}
      </div>
    </div>
  );
};

export default Home;
