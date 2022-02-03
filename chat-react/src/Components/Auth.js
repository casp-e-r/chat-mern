import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import SignIn from './SignIn'
import Signup from './Signup'

function Auth() {
    const [state, setState] = useState(0)
    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        if (user) {
            return
        }
    }, [user]);
    
    return (
        <div className="flex justify-center content-center align-middle min-h-1/2 h-screen ">
            <motion.div
            className='pb-10 w-96 m-auto bg-slate-200 ' initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}} animate={{opacity: 1, y: 0}} layout >
           {!state ?<Signup/> :<SignIn/>} 
            
			<p className=" text-center"><span>{state ? "Don't have an account?" :  'Already have an account?'}{' '}</span><b style={state ? {color: '#5887ff'} : {color: '#f0cf65'}} onClick={()=>{setState(!state)}}>{state ?'sign up now' :'Sign in Now'}.</b></p>

            
            </motion.div>
        </div>
    )
}

export default Auth
