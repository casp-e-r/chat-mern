import React from 'react';
import { ChatState } from '../ChatProvideContext';

function StarterPage() {
    const {selectedChat}=ChatState
  return (
  
    <div className={` px-4 py-10 md:p-10 h-screen overflow-x-hidden hidden z-30 md:flex-grow w-full max-w-screen-2xl  md:flex ${selectedChat?"flex":"none"} `}>
    <div className="mx-9 lg:mx-20 w-full flex justify-center content-center bg-gradient-to-l from-green-400/50 to-lime-400/50 sm:rounded-lg backdrop-blur-lg backdrop-filter bg-clip-padding shadow-lg rounded-3xl">

            <h1>nn</h1>
    </div>
  </div>
)
}

export default StarterPage;
