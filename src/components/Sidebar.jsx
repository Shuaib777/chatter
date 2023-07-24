import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import UserID from "./UserID";

const Sidebar = ({ handleCloseSidebar }) => {
  return (
    <div className="sidebar">
      <Navbar handleCloseSidebar={handleCloseSidebar}></Navbar>
      <Search></Search>
      <Chats></Chats>
      <UserID></UserID>
    </div>
  );
};

export default Sidebar;
