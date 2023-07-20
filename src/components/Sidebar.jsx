import React, { useContext } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import UserID from "./UserID";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar></Navbar>
      <Search></Search>
      <Chats></Chats>
      <UserID></UserID>
    </div>
  );
};

export default Sidebar;
