import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { ChatState } from '../../ChatProvideContext';

function Message({message}) {
  const { selectedChat,user ,setSelectedChat,setGroupButton,groupButton } = ChatState();

  return (
    <div className="grid w-full ">
      {message.sender._id===user._id ?
        <div className=" float-right ml-auto  bg-cyan-500 w-fit  rounded-tr-full rounded-bl-full rounded-tl-full py-2 px-5 mb-1">{message.content} </div>
      :
      <div className="bg-white w-fit  rounded-tr-full rounded-br-full rounded-tl-full py-2 px-5 mb-1">{message.content }</div>
      }  
    </div>);
}

export default Message;
