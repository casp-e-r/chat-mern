import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext'

function NewChat() {
    const [gpName, setGpName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [selUsers, setSelUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const { user, chats, setChats } = ChatState();

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
        } catch (error) {
          
        }
      }

      const handleGroup = (userToAdd) => {
        if (selUsers.includes(userToAdd)) {
          
          return;
        }
    
        setSelUsers([...selUsers, userToAdd]);
        console.log(selUsers);
      };
      const handleDelete = (delUser) => {
        setSelUsers(selUsers.filter((sel) => sel._id !== delUser._id));
      };

      const handleSubmit = async (e) => {
          e.preventDefault();
        if (!gpName || !selUsers) {
          console.log('fill all the fields');
          return null;
        }
    
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(
            '/chat/group',{
              name: gpName,
              users: JSON.stringify(selUsers.map((u) => u._id)),
            },config
          );
          console.log(data);
          setChats([data, ...chats]);
        //   onClose();
          console.log('new gp created');
        } catch (error) {
            console.log(error);
          console.log('failed to create gp');
        }
      };

    return (
        <div>
            <form className='my-4 grid gap-3 text-center bg-slate-700'>
                <div>
                    <label>chatname</label>
                    <input type="text" value={gpName} onChange={(e)=>setGpName(e.target.value)} className='bg-yellow-500 p-2'/>
                </div>
                <div>
                    <label>users</label>
                    <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} className='bg-yellow-500 p-2'/>
                </div>
                <div className='flex bg-green-500 h-auto w-full p-4'>

                {selUsers.map(u=>(
                    <h3 onClick={()=>handleDelete(u)} className=' mx-4'>{u.email}</h3>
                ))}
                </div>
                {loading?null:(
                    searchResults.slice(0,3).map(u=>
                        <p onClick={() => handleGroup(u)}>{u.email}</p>
                        )
                )}

                <button onClick={handleSubmit}>button</button>
                
            </form>
        </div>
    )
}

export default NewChat
