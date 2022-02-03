import React, { useState } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';



function SignIn() {
    
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(false);
	const [error, setError] = useState(null);
    const navigate=useNavigate();

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // },[])


    const handleSubmit = async ()=>{
        console.log(email,password);
        if (!email || !password) {
            setError('fill all the fields');

            return
        }
        try{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
              const {data}=await axios.post('/user/login',{email,password},config)
              localStorage.setItem("userInfo", JSON.stringify(data));
              window.location.reload();
            //   navigate('../',{replace:true})
            return console.log(data)
        }
        catch(err){
            console.log(err.response.status);
            err.response.status===401 && setError('inavlid email or password');
        }
         
     }
    return (
        <div className=" m-5 grid gap-8 pt-20 pb-10">
			<h3 className='my-1 text-pink-900'>signIn</h3>
			{error && <p className="text-red-600">{error}</p>}

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