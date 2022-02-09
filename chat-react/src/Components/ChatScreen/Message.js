import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { ChatState } from '../../ChatProvideContext';

function Message({message}) {
  const { selectedChat,user ,setSelectedChat,setGroupButton,groupButton } = ChatState();

  return (
    <div className="grid w-full backdrop-opacity-60 ">
      {message.sender._id===user._id ?
        <div className=" float-right ml-auto bg-gradient-to-r from-green-400/50 to-lime-400/50 w-fit rounded-tr-full rounded-bl-full rounded-tl-full py-2 px-5 mb-1">{message.content} </div>
      :
      <div className="bg-gradient-to-l from-gray-400/60 to-gray-300/60 w-fit  rounded-tr-full rounded-br-full rounded-tl-full py-2 px-5 mb-1">{message.content }</div>
      }  
    </div>);
}

export default Message;
