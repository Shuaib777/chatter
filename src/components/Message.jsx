import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/authContext'
import { ChatContext } from '../context/chatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const refVar = useRef();

  useEffect(() => {
    refVar.current?.scrollIntoView({behavior: "smooth"});
  },[message])

  return (
    <div ref={refVar} className={`message ${message.senderID === currentUser.uid && "owner"}`}><div className='messageInfo'>
      <img src={message.senderID === currentUser.uid?currentUser.photoURL:data.user.photoURL} alt="" />
      <span>just now</span>
    </div>
    <div className="messageContent">
      <p>{message.text}</p>
      {message.img && <img src={message.img} alt="" />}
    </div>
  </div>
    
  )
}

export default Message