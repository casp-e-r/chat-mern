
import './App.css';
import ChatView from './Components/ChatScreen/ChatView';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter ,Route, Redirect, Routes, useLocation, useNavigate} from "react-router-dom";
import View from './View/View';

import Auth from './Components/Auth';
import { useEffect, useState } from 'react';
import ChatProvider from './ChatProvideContext';

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
      {/* <Routes>

     
      <Route exact path="/" 
      element={state?<View/>:<Auth/>}>
     
      </Route>
      </Routes> */}

      </ChatProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
