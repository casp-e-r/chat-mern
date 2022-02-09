import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../ChatProvideContext'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdClose, MdPersonAdd, MdRemove } from 'react-icons/md';

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
        } catch (error) { }
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
    backgroundColor: "#86efac",
    borderRadius: "20px",
  }
}

    return (
        
          <Modal   open={modal} onClose={()=>setModal(false)} center styles={bg} >
              <div className='grid gap-3 p-4  max-w-md w-96'>
                
                <h1 className='text-center'>Create a New Group</h1>
            
                <div className='grid'>
                    {/* <label>chatname</label> */}
                    <input type="text" placeholder="Group Name..." value={gpName} onChange={(e)=>setGpName(e.target.value)} 
                    className='outline-none  text-sm rounded-3xl py-1.5 px-2 placeholder:text-green-900/80'/>
                </div>

                {selUsers.length>0 && <div className=' flex  w-full  px-1 h-12 overflow-x-scroll'>
                {selUsers.map(u=>(
                  <div className='flex p-1 items-center mx-1.5 rounded-xl bg-green-400/50 '>
                    <h3 className=' text-sm mx-0.5  '>{u.email}</h3>
                    <MdClose onClick={()=>handleDelete(u)} size={20} className='cursor-pointer text-red-600 ml-1.5 rounded-3xl bg-white/50 hover:bg-white/90 p-0.5' />
                    </div>
                ))}
                </div>}

                <div className='grid '>
                    <label className='text-sm'>Add Users</label>
                    <input type="text" value={search} placeholder="search user" onChange={(e) => handleSearch(e.target.value)} 
                    className='outline-none text-sm rounded-3xl py-1.5 px-2 placeholder:text-green-900/8'/>
                </div>
                {searchResults ? <div className='h-32 overflow-y-scroll w-full bg-transparent'>

                {loading?null:(
                  searchResults.slice(0,3).map(u=>
                    <div className='py-1.5 flex px-3'>
                      <div>
                      <p className='' >{u.name}</p>
                      <p className='text-xs font-thin' >{u.email}</p>
                      </div>
                      <MdPersonAdd onClick={() => handleGroup(u)} size={38} className='cursor-pointer text-green-900/70 ml-auto hover:bg-green-400/40 hover:text-green-900 rounded-full p-1.5'/>
                    </div>
                    )
                    )}
                </div>:null}

                <button className='py-1.5  px-3 bg-green-500/90 hover:bg-green-500/70  duration-300 rounded-3xl' onClick={handleSubmit}>create</button>
                
            </div>
          </Modal>           
    )
}

export default NewChat
