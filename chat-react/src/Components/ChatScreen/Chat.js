import React, { useEffect } from 'react'
import { ChatState } from '../../ChatProvideContext';
import UpdateGroup from './UpdateGroup';

function Chat() {
    const { selectedChat ,setGroupButton,groupButton } = ChatState();

    useEffect(() =>{

        // setGroupButton(true)
        // return()=>setGroupButton(false)
    })
    
    
   


    return (
        <div className={` p-2 sm:p-5 md:p-10 h-screen overflow-x-hidden z-30 md:flex-grow w-full max-w-screen-2xl  md:flex ${selectedChat?"flex":"none"} `}>
        <div className="rounded-3xl w-full z-40 p-3 relative flex flex-col bg-emerald-100 bg-opacity-90">
        <UpdateGroup/>

            <div className=" rounded-3xl px-10 py-5 bg-white flex">
                <h1>{selectedChat.chatName}</h1>
                <div className="ml-auto">
                    <button onClick={()=>setGroupButton(true)}>hhh</button>    
                </div>
            </div>

            <div className="flex-col px-3 flex-1 h-3/4 overflow-scroll">
                <div className="bg-white w-fit  rounded-tr-full rounded-br-full rounded-tl-full py-2 px-5 my-10">message </div>
                <div className=" float-right my-10 bg-cyan-500 w-fit  rounded-tr-full rounded-bl-full rounded-tl-full py-2 px-5">message </div>
            </div>

            <div className="px-10 w-11/12   absolute bottom-10 mt-auto  text-right bg-slate-400">
                <form className="flex h-full">
                    <button>image</button>
                    <input type='text' className='w-full  fex flex-grow mx-3  rounded-2xl ' />
                    <button type='submit' className='rounded-xl bg-teal-400 p-2 mx-2'>send</button>
                </form>

            </div>
        </div>
        </div>
    )
}

export default Chat