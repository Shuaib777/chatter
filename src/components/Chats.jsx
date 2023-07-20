import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Chats = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="chats">
      <div className="userChat">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <div className="userChatInfo">
          <span>Shuaib3</span>
          <p>hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats