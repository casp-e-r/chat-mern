
import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";
function SideBar() {
    const navigate = useNavigate();
    return (
        <div className="z-50 w-full py-2 px-7 sm:max-w-screen-sm h-screen bg-slate-200 ">
            <div className="flex flex-grow mr-auto px-10  algn py-8 items-center">
                <img src={''} alt='' className='w-14 h-14 border-2 border-gray-800 rounded-full'/>
                <h1 className='pl-6'>Header hii</h1>
            </div>
            <form className='my-4 bg-slate-700'>
                    <input type="text" className='bg-yellow-50 p-2'/>
                </form>
            <div className="pt-5 px-7 overflow-scroll h-5/6">
                
                <NavLink to={'/id'}>
                <li className='p-4 my-10 bg-gray-50 list-none backdrop-blur-lg backdrop-filter border border-gray-200 bg-opacity-60 bg-clip-padding shadow-lg rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                <NavLink to={'/id'}>
                <li className='p-4 my-10 list-none bg-yellow-200 rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                <NavLink to={'/id'}>
                <li className='p-4 my-10 list-none bg-yellow-200 rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                <NavLink to={'/id'}>
                <li className='p-4 my-10 list-none bg-yellow-200 rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                <NavLink to={'/id'}>
                <li className='p-4 my-10 list-none bg-yellow-200 rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                <NavLink to={'/id'}>
                <li className='p-4 my-10 list-none bg-yellow-200 rounded-xl'>     
                    <h1>chat</h1>
                </li>
                </NavLink>
                
                
                
                
            </div>
            
        </div>
    )
}

export default SideBar
