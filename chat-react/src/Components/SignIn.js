import React, { useState } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion';



function SignIn() {
    
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(false);


    const handleSubmit = async ()=>{
        console.log(email,password);
        try{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
              const {data}=await axios.post('/user/login',{email,password},config)
           alert('signin')
            return console.log(data)
        }
        catch(err){
            console.log(err.response.status);
            err.response.status===401 && console.log('inavlid email or password');
        }
         
     }
    return (
        <div className=" m-5 grid gap-8 pt-20 pb-10">
            
			<h3 className='my-1 text-pink-900'>signIn</h3>
            <div className="grid">
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            
            <div className='grid'>
            <label>password</label>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
                
            
            
            <button className='bg-white p-5 '
            onClick={handleSubmit}>sigggggn</button>
          
        </div>
    )
}

export default SignIn