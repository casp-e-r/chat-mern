import React from 'react'

function ChatView() {
    return (
        <div className="absolute p-10 h-screen  z-40 md:relative md:flex-grow  w-full max-w-screen-2xl   bg-slate-300 ">
            <div className=" p-10 bg-white">
                <h1>header</h1>
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
    )
}

export default ChatView
