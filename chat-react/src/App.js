
import './App.css';
import ChatView from './Components/ChatScreen/ChatView';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter ,Route, Redirect, Routes, useLocation, useNavigate} from "react-router-dom";
import View from './View/View';

import Auth from './Components/Auth';
import { useEffect, useState } from 'react';
import ChatProvider from './ChatProvideContext';
import Chat from './Components/ChatScreen/Chat';
import StarterPage from './Components/StarterPage';

function App() {
  
  const [state, setState] = useState(false)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) 
      setState(true)
    // Navigate("/chats");
  }, [state]);
  console.log(state);
  return (
    <div className="App h-screen no-scrollbar">
      <BrowserRouter>
      <ChatProvider>
      {state?<View/>:<Auth/>}
      

     {/* {state ? 
      <Routes>
      <Route exact path="/" 
      element={
      <div className="flex flex-row">
          <SideBar/>
          <StarterPage/>
      </div>
      }/>
     
      <Route exact path="/:chatId" element={
        <div className="flex flex-row">

        <SideBar/>
        <Chat/>
        </div>
      } />
      </Routes>
      :
      <Auth/>
      
      } */}

      </ChatProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
