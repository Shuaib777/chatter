import React, { useContext, useEffect, useState } from "react";
import Cam from "../image/cam.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/authContext";
import { onValue } from "firebase/database";
import { database, refdb } from "../firebase";
import { PopupContext } from "../context/popupContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  //this data will comtain two things: chatid(combined id) and user(which i gave through payload)
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [chatted, setchatted] = useState(false);
  const { dispatch } = useContext(PopupContext);
  const navigate = useNavigate();

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

  const handleClick = () =>
    dispatch({ type: "CHANGE_STATE", payload: true, id: "anotherUser" });

  const handleJoin = () => {
    navigate(`/videoroom/${data.chatID}`);
  };

  return (
    <div className="chat">
      {chatted ? (
        <>
          <div className="chatInfo">
            {data?.user && (
              <div className="userProfile">
                {data?.user?.photoURL && (
                  <img
                    src={data?.user?.photoURL}
                    onClick={() => handleClick()}
                    alt=""
                  />
                )}

                <span>{data?.user?.displayname}</span>
              </div>
            )}
            <div className="chatIcons">
              <img src={Cam} onClick={handleJoin} alt="" />
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
