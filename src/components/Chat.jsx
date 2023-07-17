import React from 'react'
import Cam from '../image/cam.png';
import Add from '../image/add.png';
import More from '../image/more.png';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Shuaib</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat