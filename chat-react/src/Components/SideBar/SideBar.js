
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import { ChatState } from '../../ChatProvideContext';
import NewChat from './NewChat';
function SideBar() {
    const { user,fetching, chats, setChats,selectedChat,setSelectedChat } = ChatState();
    const [loggedUser, setLoggedUser] = useState()

    // console.log(user,chats);
    const fetchChats = async () => {
        // console.log(user._id);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          const { data } = await axios.get("/chat", config);
          setChats(data);
        } catch (error) {
          console.log('failed to load chats');
        }
      };
      useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
      }, [fetching]);
    const navigate = useNavigate();

    const logoutHandler=async ()=>{
      try{localStorage.removeItem("userInfo");
      navigate('../',{replace:true})
    }
    catch{}

    } 

    return (
        <div className={` w-full py-2 px-7 sm:max-w-screen-sm h-screen bg-slate-200 md:flex ${selectedChat ? 'hidden':'flex' } `}>
            <div className='w-full'>           
            <div className="flex flex-grow mr-auto px-10  algn py-8 items-center">
                <img src={''} alt='' className='w-14 h-14 border-2 border-gray-800 rounded-full'/>
                <h1 className='pl-6'>Header hii</h1>
            </div>
            <div>
              <button onClick={logoutHandler}>logout</button>
            </div>
            <NewChat/>
            
            <div className="pt-5 px-7 overflow-scroll h-4/5">
                
                {/* <NavLink to={'/id'}>
                <li className='p-4 my-10 bg-gray-50 list-none backdrop-blur-lg backdrop-filter border border-gray-200 bg-opacity-60 bg-clip-padding shadow-lg rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink> */}
                {chats.map(chat =>
               
                <li onClick={() => setSelectedChat(chat)} className='p-4 my-10 bg-gray-50 list-none backdrop-blur-lg backdrop-filter border border-gray-200 bg-opacity-60 bg-clip-padding shadow-lg rounded-xl'>     
                    <h1>{chat.chatName}</h1>
                </li>
               
                )}
                
                
                
                
            </div>
            </div>
        </div>
    )
}

export default SideBar
