import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext';

function UpdateGroup() {
    const [groupChatName, setGroupChatName] = useState();
    const [renameloading, setRenameLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedChat, setSelectedChat,user,fetching,setFetching,groupButton,setGroupButton } = ChatState();
    const handleRename = async () => {
        if (!groupChatName) return;
        try {
          setRenameLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/chat/rename`,
            {
              chatId: selectedChat._id,
              chatName: groupChatName,
            },
            config
          );
          console.log(data._id);
          setSelectedChat(data);
          setFetching(!fetching);
          setRenameLoading(false);
        } catch (error) {
          console.log('error occured');
          setRenameLoading(false);
        }
        setGroupChatName("");
      };

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
          console.log(data);
          setLoading(false);
          setSearchResult(data);
        } catch (error) {
          setSearchResult()
          console.log('error occured');
          setLoading(false);
        }
      }
      // const clearChat=async()=>{
      //   console.log('why');
      //   try {
          
      //     const { data } = await axios.put(`/message/${selectedChat._id}`)
      //     console.log(data);
      //   } catch (error) {
      //     console.log(error);
      //   }
        
      // }
      const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
          console.log('user already in ');
          return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
          console.log('admin can only add');
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/chat/groupadd`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
          setSelectedChat(data);
          setFetching(!fetching);
          setLoading(false);
        } catch (error) {
         console.log('error occured');
          setLoading(false);
        }
        setGroupChatName("");
      };

      const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
          console.log('only admins can remove');
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/chat/groupremove`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );

          user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
          setFetching(!fetching);
        //   fetchMessages();
          setLoading(false);
        } catch (error) {
          console.log('error occured');
          setLoading(false);
        }
        setGroupChatName("");
      }
    
    return (
        <div className={`top-0 right-0 rounded shadow-xl absolute p-5 z-40 bg-emerald-200 h-full ease-in-out duration-300  ${groupButton ? "translate-x-0 " : "translate-x-full opacity-0 "}  `}>
            <div className=" h-full w-full">
                <button onClick={() =>setGroupButton(false)}>button</button>
                <div className="w-full flex flex-row p-4">
                    <input type="text" placeholder="Gp Name"value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)} />
                    <button onClick={handleRename}>change</button>
                </div>
                {user.email === selectedChat.groupAdmin.email && 
                <div className='p-4 peer relative '>
                    <input type="text" className="peer" placeholder="add users"
                    value={search}
                     onChange={(e) => handleSearch(e.target.value)} />                    
                     <div className="  peer h-36 z-50 w-3/4 bg-indigo-600 peer-focus:block peer-hover:block">
                      {searchResult.map(u=>(
                          <p onClick={() =>handleAddUser(u)}>{u.email}</p>
                      ))}
                    </div>
                </div> 
                 } 
                <div className="m-1  bg-slate-100 overflow-y-scroll h-1/2 ">
                    {selectedChat.users.map(u=>(
                        <div className="flex flex-row py-3">
                            <p className="mx-1">{u.email}</p>
                            {!(user.email===u.email) && !(u.email===selectedChat.groupAdmin.email)  &&
                            <button
                             className='ml-auto'
                             onClick={()=>handleRemove(u)}>X</button>}
                        </div>   
                    ))}
                </div>
                {/* <button onClick={clearChat}>
                  clearchat
                </button> */}
                
                <div className='bottom-0 fixed p-10 w-full '>
                    <button>remove</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateGroup