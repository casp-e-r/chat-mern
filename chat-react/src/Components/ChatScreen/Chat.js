import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

import Message from './Message'
import { ChatState } from '../../ChatProvideContext';
import UpdateGroup from './UpdateGroup';
import io from "socket.io-client";
import { MdSend } from 'react-icons/md';

const ENDPOINT="http://localhost:9000"
var socket,selectedChatCompare

function Chat() {
    const { selectedChat,user,setNotification,notification,
      setSelectedChat,setGroupButton,groupButton ,fetching,setFetching} = ChatState();
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const [loading,setLoading]=useState(false)
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
   
    
    const scrollerRef = useRef(null)
    
    
    
    
    

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
          socket.emit("join chat", selectedChat._id);
        } catch (error) {
          console.log('failed to load messages',error);
        }
      };
    //   console.log(messages);
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        if (!socketConnected) return;
    
        if (!typing) {
          setTyping(true);
          socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 2000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;
          if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        }, timerLength);
    }
     
      const sendMessage = async (e) => {
          e.preventDefault();
          socket.emit("stop typing", selectedChat._id);
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
            socket.emit("new message", data);
        
            setMessages([...messages, data]);
          } catch (error) {
            console.log('failed to send message',error);
        }
      };
      useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        // eslint-disable-next-line
      }, []);

      useEffect(() => {
        fetchMessages();
        selectedChatCompare=selectedChat
      }, [selectedChat]);
      useEffect(() => {
        scrollerRef.current?.scrollIntoView() 
      },[messages]);

      useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
          console.log(newMessageRecieved);
          if (
            !selectedChatCompare || // if chat is not selected or doesn't match current chat
            selectedChatCompare._id !== newMessageRecieved.chat._id
          ) 
          {
            if (!notification.includes(newMessageRecieved)) {
              setNotification([newMessageRecieved, ...notification]);
              setFetching(!fetching);
            }
          } 
          else {
            setMessages([...messages, newMessageRecieved]);
          }
        });
      }); 
      console.log(selectedChat);
    

    return (
    <div className={` sm:p-5 md:p-7 lg:p-10 h-screen overflow-x-hidden z-30 md:flex-grow w-full max-w-screen-2xl  md:flex ${selectedChat?"flex":"none"} `}>
        <div className="sm:rounded-lg w-full z-40 p-3 relative flex flex-col bg-emerald-100/10 backdrop-blur-lg backdrop-filter bg-clip-padding shadow-lg bg-opacity-30 h-full">
            {selectedChat.isGroupChat && <UpdateGroup/>}
            <div className=" rounded-lg  px-10 py-5 bg-gradient-to-l from-green-400/50 to-lime-500/50 flex">
                <h1>{selectedChat.chatName}</h1>
                <div className="ml-auto">
                    <button onClick={()=>setGroupButton(true)}>hhh</button>    
                </div>
            </div>
            {loading?<div className="flex-col px-3 flex-1 overflow-x-scroll align-text-bottom ">loading...</div>
            :
            <div id="chatList" className="flex  flex-col px-3 py-3 my-1 flex-1 overflow-x-scroll align-text-bottom ">                
                {messages?.map((m,i)=>
                   <Message message={m}/>
                )}
                <div ref={scrollerRef} />
            </div>}
            {isTyping && <p>typing..</p>}
            <div className="px-7 py-5 mt-2 bottom-10 bg-gradient-to-l rounded-lg from-green-400/50 to-lime-500/50 text-right">
                <form onSubmit={sendMessage} className="flex h-full" >
                  <div className="bg-gradient-to-r from-green-400/50 to-lime-400/50 p-1 rounded-2xl w-full mr-1 ">
                    <input type='text' value={newMessage}  onChange={typingHandler}  className='w-full h-full outline-none bg-white px-5  fex flex-grow rounded-2xl ' />
                  </div>
                    <button type='submit'   className='rounded-xl bg-teal-400 p-2 '><MdSend className='text-white'/></button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Chat