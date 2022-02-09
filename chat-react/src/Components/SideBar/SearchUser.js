import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext'
import axios from 'axios'
import { MdClose, MdMessage } from 'react-icons/md';


function SearchUser() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const {searchButton,setSearchButton,user,setSelectedChat,chats,setChats}=ChatState()
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    
    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`/user?search=${search}`, config);
        //   console.log(data);
          setLoading(false);
          setSearchResults(data);
        } catch (error) { }
      }
      const accessChat = async (userId) => {
        console.log(userId);
    
        try {
          setLoadingChat(true);
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(`/chat`, { userId }, config);
    
          if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
          setSelectedChat(data);
          setLoadingChat(false);
          setSearchButton(false)
        } catch (error) {
          console.log('error fetching chat');
        }
      };
      console.log(search,searchResults);
    return (
    <div className={`top-0 left-0 shadow-[24px_1px_15px_-15px_rgba(163,230,53,0.5)] rounded-lg absolute p-5 z-40 bg-green-300  h-full ease-in-out duration-300  ${searchButton ? "translate-x-0 " : "-translate-x-full opacity-0 "}  `}>
        <div className="">
            <div>
                <button onClick={() =>setSearchButton(false)} className="px-1.5 py-1 bg-green-400/40 rounded-xl hover:bg-green-400/80 mb-2"><MdClose className='text-green-900'/></button>
            </div>
            <div className='flex'>
                <input type='text' placeholder='Search User' value={search} onChange={(e) => handleSearch(e.target.value)}
                className='outline-none py-1 px-3 rounded-3xl placeholder:text-green-500 '/>    
            </div>
            {searchResults.length>0  &&
            <p className=' text-sm mt-2 font-light'>
                search results
            </p >}
            {searchResults && <div className=' pt-4 pb-6 px-2'>
                {searchResults.map(u=>
                <div className='flex w-full items-center my-1.5 p-1.5 rounded-lg bg-green-400/40 hover:bg-green-400/70 '>
                    <div>
                        <p >{u.name}</p>
                        <label className='text-xs font-light'>{u.email}</label>
                    </div>
                    <MdMessage onClick={() => accessChat(u._id)} size={30} className=' cursor-pointer md:scale-95 text-green-900 ml-auto ' />
                </div>
                )}
                </div>}
        </div>        
    </div>
    )
}

export default SearchUser
