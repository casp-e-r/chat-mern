import React from 'react'
import { ChatState } from '../../ChatProvideContext';
import UpdateGroup from './UpdateGroup';

function Chat() {
    const { selectedChat ,setGroupButton,groupButton } = ChatState();
    console.log(selectedChat);


    return (
        <div className={` p-10 h-screen  z-40  md:flex-grow w-full max-w-screen-2xl bg-slate-300 md:flex ${selectedChat?"flex":"none"} `}>
        <div className="w-full relative">
        {groupButton && <UpdateGroup/>}


            <div className="  p-10 bg-white">
                <h1>{selectedChat.chatName}</h1>
                <div className="ml-auto">
                    <button onClick={()=>setGroupButton(true)}>hhh</button>
                    
                </div>
            </div>
            <div className="bg-slate-100 flex-col flex-1 h-3/4 overflow-scroll">
                <div className=" my-10">message </div>
                <div className=" float-right my-10">message </div>
                

            </div>
            <div className="absolute bottom-10 mt-auto bg-slate-400">
                <form>
                    <input type='text' />
                    <button type='submit'>kkk</button>
                </form>

            </div>
        </div>
        </div>
    )
}

export default Chat