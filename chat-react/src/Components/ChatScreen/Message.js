import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { ChatState } from '../../ChatProvideContext';

function Message() {
  const { selectedChat,user ,setSelectedChat,setGroupButton,groupButton } = ChatState();
  const [messages,setMessages]=useState([])
  const [newMessage,setNewMessage]=useState('')
  const [loading,setLoading]=useState(false)
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

  const sendMessage =async ()=>{
    console.log(newMessage);
  }

  return (
    <div>
        {loading ? <p>loading</p>:
        <div>
            <div className="flex-col px-3 flex-1 h-3/4 overflow-scroll">
                <div className="bg-white w-fit  rounded-tr-full rounded-br-full rounded-tl-full py-2 px-5 my-10">message </div>
                <div className=" float-right my-10 bg-cyan-500 w-fit  rounded-tr-full rounded-bl-full rounded-tl-full py-2 px-5">message </div>
            </div>

            <div className="px-10 w-11/12   absolute bottom-10 mt-auto  text-right bg-slate-400">
                <div className="flex h-full"  >
                    <button >image</button>
                    <input type='text' onChange={typingHandler}  className='w-full  fex flex-grow mx-3  rounded-2xl ' onKeyDown={sendMessage} />
                    <button   onClick={sendMessage} className='rounded-xl bg-teal-400 p-2 mx-2'>send</button>
                </div>
            </div>
        </div>}
    </div>);
}

export default Message;
