import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Popup from "../components/Popup";
import { PopupContext } from "../context/popupContext";

const Home = () => {
  const screenWidth = window.screen.width;
  const [isSidebar, setIsSidebar] = useState(screenWidth > 1200);

  const handleCloseSidebar = () => {
    setIsSidebar(false);
  };

  const { popupState } = useContext(PopupContext);
  return (
    <div className="home">
      <div className="container">
        {isSidebar || (
          <span className="hamburger" onClick={() => setIsSidebar(true)}>
            ☰
          </span>
        )}
        {isSidebar && (
          <Sidebar handleCloseSidebar={handleCloseSidebar}></Sidebar>
        )}
        <Chat></Chat>
        {popupState.isOpen && <Popup></Popup>}
      </div>
    </div>
  );
};

export default Home;
