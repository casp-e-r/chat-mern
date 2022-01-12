
import './App.css';
import ChatView from './Components/ChatScreen/ChatView';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter ,Route, Redirect, Routes, useLocation} from "react-router-dom";
import View from './View/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

    
     <Route exact path="/id" element={
     <div className="flex flex-row  max-h-screen">
     <SideBar className='mob hidden sm:flex' />
     <ChatView className=''/>
     </div>
     } />
     {/* <Route exact path="/id">
       <SideBar/>
       <ChatView/>
     </Route> */}
      <Route exact path="/" element={<SideBar/>}></Route>
      </Routes>


    </BrowserRouter>
    </div>
  );
}

export default App;
