import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../context/chatContext';
import { onValue } from 'firebase/database';
import { database, refdb } from '../firebase';
import { AuthContext } from '../context/authContext';

const Messages = () => {

  const {currentUser} = useContext(AuthContext);
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onValue(refdb(database, `chats/${data.chatID}/message/`),(snapshot) => {
        return setMessages(snapshot.val());
      })
  
      return () => {
        unsub();
      }
    }

    currentUser.uid && getMessages();
  }, [data.chatID])

  console.log(messages)

  return (
    <div className="messages">
      {messages?.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
    )
}

export default Messages