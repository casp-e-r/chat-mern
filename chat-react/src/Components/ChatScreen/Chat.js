import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

import Message from './Message'
import { ChatState } from '../../ChatProvideContext';
import UpdateGroup from './UpdateGroup';

function Chat() {
    const { selectedChat,user ,setSelectedChat,setGroupButton,groupButton } = ChatState();
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const [loading,setLoading]=useState(false)
   
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }
    const ref = useRef()
    const scrollToBottom = () => {
        ref.current?.scrollIntoView({behavior: "auto"})
      }
    useEffect(() => {
        scrollToBottom();
    },[messages])
    
    const fetchMessages = async () => {
        if (!selectedChat) return;
    
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          setLoading(true);
    
          const { data } = await axios.get(
            `/message/${selectedChat._id}`,
            config
          );
          setMessages(data);
          setLoading(false);
    
        //   socket.emit("join chat", selectedChat._id);
        } catch (error) {
          console.log('failed to load messages',error);
        }
      };
    //   console.log(messages);
     
      const sendMessage = async (e) => {
          e.preventDefault();
        //   socket.emit("stop typing", selectedChat._id);
        console.log(newMessage);
          try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            setNewMessage("");
            const { data } = await axios.post(
              '/message',
              {
                content: newMessage,
                chatId: selectedChat,
              },
              config
            );
            // socket.emit("new message", data);
        
            setMessages([...messages, data]);
          } catch (error) {
            console.log('failed to send message',error);
        }
      };
      useEffect(() => {
        fetchMessages();
    
      }, [selectedChat]);
        // if (!socketConnected) return;
    
        // if (!typing) {
        //   setTyping(true);
        //   socket.emit("typing", selectedChat._id);
        // }
        // let lastTypingTime = new Date().getTime();
        // var timerLength = 3000;
        // setTimeout(() => {
        //   var timeNow = new Date().getTime();
        //   var timeDiff = timeNow - lastTypingTime;
        //   if (timeDiff >= timerLength && typing) {
        //     socket.emit("stop typing", selectedChat._id);
        //     setTyping(false);
        //   }
        // }, timerLength);
      
    

    return (
    <div className={`  sm:p-5 md:p-10 h-screen overflow-x-hidden z-30 md:flex-grow w-full max-w-screen-2xl  md:flex ${selectedChat?"flex":"none"} `}>
        <div className="sm:rounded-3xl w-full z-40 p-3 relative flex flex-col bg-emerald-100 bg-opacity-90 h-full">
            <UpdateGroup/>
            <div className=" rounded-3xl  px-10 py-5 bg-white flex">
                <h1>{selectedChat.chatName}</h1>
                <div className="ml-auto">
                    <button onClick={()=>setGroupButton(true)}>hhh</button>    
                </div>
            </div>

            {loading?<div className="flex-col px-3 flex-1 overflow-x-scroll align-text-bottom ">loading...</div>
            :
            <div className="flex-col px-3 my-1 flex-1 overflow-x-scroll align-text-bottom ">
                
                {messages?.map((m,i)=>
                   <Message message={m}/>
                )}
                <p ref={ref} className=" sticky bottom-0"></p>
            </div>}


            <div className="px-10 w-11/12 mt-2  bottom-10 mt-auto  text-right bg-slate-400">
                <form onSubmit={sendMessage} className="flex h-full" >
                    <button onClick={fetchMessages}>image</button>
                    <input type='text' value={newMessage}  onChange={typingHandler}  className='w-full  fex flex-grow mx-3  rounded-2xl ' />
                    <button type='submit'   className='rounded-xl bg-teal-400 p-2 mx-2'>send</button>
                </form>
            </div>
            {/* <Message/> */}
        </div>
    </div>
    )
}

export default Chat