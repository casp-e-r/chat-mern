
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import { ChatState } from '../../ChatProvideContext';
import NewChat from './NewChat';
import SearchUser from './SearchUser';
import { MdGroupAdd, MdPersonSearch ,MdLogout } from "react-icons/md"
import { IoMdPersonAdd } from "react-icons/io"



function SideBar() {
    const { user,fetching, chats,
            setChats,selectedChat,setSelectedChat,searchButton,
            setSearchButton,setModal,modal,setGroupButton,notification } = ChatState();
    const [loggedUser, setLoggedUser] = useState()
    

    
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
          console.log('failed to load chats',error);
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
      window.location.reload();

      // navigate('../',{replace:true})
    }
    catch{}
  } 
  // console.log(notification);
 
  // const handleChat=async (chat)=>{
  //   try{
  //      await  setSelectedChat(chat)
  //      navigate(`/${chat._id}`,{replace:false})
  //   }
  //   catch{}
  // }
  
    return (
        <div className={` w-full sm:p-5 md:p-7   lg:p-10 sm:max-w-screen-sm h-screen  md:flex ${selectedChat ? 'hidden':'flex' }  `}>
            <div 
            
            className='w-full p-2 sm:p-3 relative bg-gradient-to-r from-green-400/50 to-lime-400/50 sm:rounded-lg backdrop-blur-lg backdrop-filter bg-clip-padding shadow-lg'>   
              <SearchUser/>
              <div className='py-5' onClick={()=>searchButton && setSearchButton(false)}>
                <h1>Search</h1> 
              </div>
              <div onClick={()=>searchButton && setSearchButton(false)} className='rounded-lg grid  md:px-4 lg:px-6  py-2 bg-green-50 backdrop-brightness-75 backdrop-blur-lg backdrop-filter bg-clip-padding shadow-lg'>

                <div className="rounded-lg flex flex-grow mr-auto w-full px-5  lg:px-10 py-4 sm:py-6 md:py-7 items-center ">
                  <img src={''} alt='' className='w-14 h-14 border-2 border-gray-800 rounded-full'/>
                  <h1 className='pl-6'>{user.name}  hii</h1>
                  <div className='flex  cursor-pointer items-center ml-auto px-2 py-0.5 rounded-2xl hover:bg-slate-600' onClick={logoutHandler}>
                    <button  className=''>logout </button>    
                    <MdLogout size={20} style={{ height: '20px', width: '20px' }}  className='h-6 ml-2 text-green-900'/> 
                  </div>
                </div>
                <div className='grid grid-flow-col gap-4 py-2  px-10 '>
                  <div className='flex group justify-center cursor-pointer hover:bg-green-400 w-3/4' onClick={()=>setSearchButton(true)}>
                    {/* <button className='text-xs' onClick={()=>setSearchButton(true)}>search user</button> */}
                    <MdPersonSearch size={20} style={{ height: '33px', width: '35px' }}  className='h-6 group-hover:text-emerald-100 text-green-900'/> 
                  </div>
                  <div className='flex group justify-center cursor-pointer hover:bg-green-400 w-3/4' onClick={()=>setModal(true)}>
                  {/* <button onClick={()=>{setSearchButton(false);setModal(true)}}>Create</button> */}
                    <MdGroupAdd size={20} style={{ height: '35px', width: '35px' }}   className=' h-6 group-hover:text-emerald-100 text-green-900 '/> 
                  </div>
                </div>
              </div>

              <NewChat/>
            
              <div onClick={()=>searchButton && setSearchButton(false)} className=" px-7 overflow-scroll h-3/4">
               
                {chats.map(chat =>
                <li 
                // onClick={()=>handleChat(chat)}
                onClick={() => {setSelectedChat(chat);setGroupButton(false)}} 
                className='p-4 cursor-pointer hover:bg-black/5 my-10 bg-white/5 list-none backdrop-blur-lg backdrop-filter border border-black/5  bg-clip-padding shadow-lg rounded-xl'>     
                    <h1 className=''>{chat.isGroupChat ? chat.chatName : (chat.users.map(u=>{if(u.email!==user.email) return u.name}))}</h1>
                </li>
                )}     
              </div>
            </div>
        </div>
    )
}

export default SideBar
