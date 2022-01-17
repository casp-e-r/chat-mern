
import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import { ChatState } from '../../ChatProvideContext';
import NewChat from './NewChat';
function SideBar() {
    const { user, chats, setChats } = ChatState();

    const navigate = useNavigate();
    return (
        <div className="z-50 w-full py-2 px-7 sm:max-w-screen-sm h-screen bg-slate-200 ">
            <div className="flex flex-grow mr-auto px-10  algn py-8 items-center">
                <img src={''} alt='' className='w-14 h-14 border-2 border-gray-800 rounded-full'/>
                <h1 className='pl-6'>Header hii</h1>
            </div>
            <NewChat/>
            
            <div className="pt-5 px-7 overflow-scroll h-4/5">
                
                <NavLink to={'/id'}>
                <li className='p-4 my-10 bg-gray-50 list-none backdrop-blur-lg backdrop-filter border border-gray-200 bg-opacity-60 bg-clip-padding shadow-lg rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                {chats.map(chat =>
               
                <li className='p-4 my-10 bg-gray-50 list-none backdrop-blur-lg backdrop-filter border border-gray-200 bg-opacity-60 bg-clip-padding shadow-lg rounded-xl'>     
                    <h1>{chat.chatName}</h1>
                </li>
                )}
                
                
                
                
            </div>
            
        </div>
    )
}

export default SideBar
