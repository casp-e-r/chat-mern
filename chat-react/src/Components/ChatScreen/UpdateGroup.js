import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext';
import {motion} from 'framer-motion';


function UpdateGroup() {
    const variants={
        open:{opacity:0,x:"-100%"},
        close:{opacity:1, x:"-0%"}
    }
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
          // setSelectedChat("");
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
          console.log('error occured');
          setLoading(false);
        }
      }
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
        // <motion.div 
        // animate={{x:0,opacity:1}} initial={{x:10,opacity:1}} exit={{x:30,opacity:0}} 
        <div
        className={` z-50 bg-indigo-400 lg:p-10   h-full bottom-0 right-0   absolute
         
        `}>
            <div className="grid gap-2 w-full">
                <button onClick={() =>setGroupButton(false)}>button</button>
                <div className="w-full">
                    
                    <div className="flex flex-row">
                    <input type="text" placeholder="Gp Name"value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)} />
                    <button onClick={handleRename}>change</button>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="add users"
                    value={search}
                     onChange={(e) => handleSearch(e.target.value)} />                    
                </div> 

                <div className="m-1  bg-slate-100 ">
                    {selectedChat.users.map(u=>(
                        <div className="flex flex-row">
                            <p className="mx-1">{u.email}</p>
                            {!(user.email===u.email) &&
                            <button onClick={()=>handleRemove(u)}>X</button>}
                        </div>
                    ))}

                </div>
                <div>
                    {searchResult.map(u=>(
                        <p onClick={() =>handleAddUser(u)}>{u.email}</p>
                    ))}
                </div>
                <div>
                    <button>remove</button>
                </div>
            </div>
        </div>
        // </motion.div>

    )
}

export default UpdateGroup
