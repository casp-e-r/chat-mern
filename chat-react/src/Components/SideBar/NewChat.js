import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function NewChat() {
    const [gpName, setGpName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [selUsers, setSelUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const { user, chats, setChats,modal,setModal } = ChatState();

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
          setModal(false)
       
          console.log('new gp created');
        } catch (error) {
            console.log(error);
          console.log('failed to create gp');
        }
      };

 const bg = {
  
  modal: {
    backgroundColor: "#50C878",
    borderRadius: "20px",
  }
  
}

    return (
        
          <Modal   open={modal} onClose={()=>setModal(false)} center styles={bg} >
              <div className='grid gap-3 p-4 max-w-md '>
                
                <h1>Create a new Group</h1>
          
            
                <div className='grid'>
                    <label>chatname</label>
                    <input type="text" value={gpName} onChange={(e)=>setGpName(e.target.value)} className='rounded-3xl p-2'/>
                </div>
                <div className='flex bg-white w-full p-1 overflow-x-scroll'>

                {selUsers.map(u=>(
                    <h3 onClick={()=>handleDelete(u)} className='mx-20'>{u.email}</h3>
                ))}
                </div>
                <div className='grid '>
                    <label>users</label>
                    <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} className='rounded-3xl p-2'/>
                </div>
                {searchResults ? <div className='h-28 overflow-y-scroll w-full bg-transparent'>

                {loading?null:(
                  searchResults.slice(0,3).map(u=>
                    <p className='py-2' onClick={() => handleGroup(u)}>{u.email}</p>
                    )
                    )}
                </div>:null}

                <button onClick={handleSubmit}>create</button>
                
            
            </div>

            </Modal>
            
    )
}

export default NewChat
