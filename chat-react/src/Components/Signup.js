import React, { useState } from 'react'
import axios from 'axios'


function Signup() {
    const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);


     const handleSubmit = async ()=>{
        console.log(name,email,password);
        if (!name || !email || !password) {
            setError('fill all the fields');

            return
        }
        try{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
            const {data}=await axios.post('/user',{name,email,password},config)
            return console.log(data)
        }
        catch(err){
            console.log(err.response.status);
            err.response.status===400 && setError('user already exist');
        }
         
     }
     
     
    return (
        <div className='m-5 grid gap-8 pt-20 pb-10'>
			<h3 className='my-1 text-pink-900'>signUp</h3>
			{error && <p className="text-red-600">{error}</p>}


            <div className='grid'>
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            
            <div className='grid'>
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className='grid'>
            <label>password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            
            <button className='border-l-pink-300 p-5 '
            
            onClick={handleSubmit}>sigggggn</button>
        </div>
    )
}

export default Signup
