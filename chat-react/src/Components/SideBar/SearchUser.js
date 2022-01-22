import React from 'react'
import { ChatState } from '../../ChatProvideContext'

function SearchUser() {
    const {searchButton,setSearchButton}=ChatState()
    return (
    <div className={`top-0 left-0 shadow-xl rounded-lg absolute p-5 z-40 bg-emerald-200 h-full ease-in-out duration-300  ${searchButton ? "translate-x-0 " : "-translate-x-full opacity-0 "}  `}>
        <div className="">
            <div>
                <button onClick={() =>setSearchButton(false)}>close</button>
            </div>
            <div className='flex'>
                <input type='text' placeholder='Search User'/>    
            </div>
        </div>        
    </div>
    )
}

export default SearchUser
