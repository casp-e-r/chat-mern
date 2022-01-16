
import './App.css';
import ChatView from './Components/ChatScreen/ChatView';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter ,Route, Redirect, Routes, useLocation} from "react-router-dom";
import View from './View/View';
import Login from './Components/Login';
import Signup from './Components/Signup';
import SignIn from './Components/SignIn';
import Auth from './Components/Auth';

function App() {
  return (
    <div className="App h-screen no-scrollbar">
      <BrowserRouter>
      <Routes>

    
     <Route exact path="/id" element={
     <div className="flex flex-row  h-5/6">
     <SideBar className='mob hidden sm:flex' />
     <ChatView className=''/>
     </div>
     } />
     {/* <Route exact path="/id">
       <SideBar/>
       <ChatView/>
     </Route> */}
      <Route exact path="/" 
      element={<Auth/>}>
     
      </Route>
      </Routes>


    </BrowserRouter>
    </div>
  );
}

export default App;
