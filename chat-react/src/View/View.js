import React from 'react'
import { ChatState } from '../ChatProvideContext.js'
import Chat from '../Components/ChatScreen/Chat.js'
import ChatView from '../Components/ChatScreen/ChatView.js'
import SideBar from '../Components/SideBar/SideBar.js'
import StarterPage from '../Components/StarterPage.js'
import './View.js'

function View() {

    const {selectedChat}=ChatState()
    return (
        <div className="flex flex-row  h-5/6">
            <SideBar/>
            {/* <ChatView/> */}

            {selectedChat ? <Chat/>: <StarterPage/>}
            
        </div>
    )
}

export default View
