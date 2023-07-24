import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { Link, useNavigate } from "react-router-dom";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const image = message.img;
  const navigate = useNavigate();

  const refVar = useRef();

  useEffect(() => {
    refVar.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleClick = () => {};

  return (
    <div
      ref={refVar}
      className={`message ${message.senderID === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderID === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && (
          <>
            <img src={image} alt="" />
            <Link to={"/image"} state={{ image }}>
              Open Image
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
