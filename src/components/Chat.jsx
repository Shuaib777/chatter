import React, { useContext, useEffect, useState } from "react";
import Cam from "../image/cam.png";
import Add from "../image/add.png";
import More from "../image/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/authContext";
import { onValue } from "firebase/database";
import { database, refdb } from "../firebase";

const Chat = () => {
  //this data will comtain two things: chatid(combined id) and user(which i gave through payload)
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [chatted, setchatted] = useState(false);

  useEffect(() => {
    const getChats = () => {
      const unsub = onValue(
        refdb(database, `userChats/${currentUser.uid}`),
        (snapshot) => {
          setchatted(snapshot.val() === "start conversation" ? false : true);
        }
      );

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="chat">
      {chatted ? (
        <>
          <div className="chatInfo">
            <span>{data.user?.displayname}</span>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <Messages></Messages>
          <Input></Input>
        </>
      ) : (
        <div className="firstUser">
          <div className="backgroundWrapper"></div>
          <div className="firstUserContent">
            <em>Receive and send Messages using Chatter</em>
            <p>
              Unleash the Power of Words: Connect, Create, Conquer - Welcome to
              Chatter
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
