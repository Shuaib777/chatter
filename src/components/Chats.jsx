import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { onValue, orderByChild, query } from 'firebase/database';
import { database, refdb } from '../firebase';
import { ChatContext } from '../context/chatContext';

const Chats = () => {
  const {currentUser} = useContext(AuthContext);
  const {dispatch, data} = useContext(ChatContext);

  const [chats, setChats] = useState([]);

  useEffect(()=>{
    const getChats = ()=>{
      const unsub = onValue(refdb(database, 'userChats/'+ currentUser.uid),(snapshot) => {
        setChats(snapshot.val());
      })

      return ()=> {
        unsub();
      }
    }

    currentUser.uid && getChats()
    
  },[currentUser.uid])

  const handleClick = (u) => {
    dispatch({type: "CHANGE_USER", payload: u});
  };

  //Object.entries() returns an array with two elements: the first element is the property key, and the second element is the property value
  return (
    <div className="chats">
      {chats !== 'start conversation'?Object.entries(chats).map((chat) => 
        <div className="userChat" key={chat[0]} onClick={() => handleClick(chat[1].userinfo)}>
          <img src={chat[1].userinfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userinfo.displayname}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ) : <span style={{color:"red", margin:"10px"}}>Start your first conversation by searching users</span>}
    </div>
  )
}

export default Chats