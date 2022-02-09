import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext'
import axios from 'axios'


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
        //   onClose();
        } catch (error) {
          console.log('error fetching chat');
        }
      };
      console.log(search,searchResults);
    return (
    <div className={`top-0 left-0 shadow-xl rounded-lg absolute p-5 z-40 bg-green-300 backdrop-brightness-0 h-full ease-in-out duration-300  ${searchButton ? "translate-x-0 " : "-translate-x-full opacity-0 "}  `}>
        <div className="">
            <div>
                <button onClick={() =>setSearchButton(false)}>close</button>
            </div>
            <div className='flex'>
                <input type='text' placeholder='Search User' value={search} onChange={(e) => handleSearch(e.target.value)}/>    
            </div>
            {searchResults && <div>
                {searchResults.map(u=>
                    <p onClick={() => accessChat(u._id)}>{u.name}</p>
                )}
                </div>}
        </div>        
    </div>
    )
}

export default SearchUser
