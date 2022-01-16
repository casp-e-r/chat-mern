import React, { useState } from 'react'
import {motion} from 'framer-motion';
import axios from 'axios'


function Login() {
    const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [signup, setSignup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async () => {
       
    if (signup) {
        
    
            console.log('jj');
            if (!name || !email || !password) {
                setError('fill all the fields');

                return
            }
            try{
                
                
                console.log('dddd');
                const config = {
                    headers: {
                      "Content-type": "application/json",
                    },
                  };
                  console.log({
                    name:name,
                    email:email,
                    password:password,
                  });
                  const {data}=await axios.post(
                    "/user",
                    {
                     name,
                     email,
                     password
                    },
                    config,
                    
                  );
        //  const {data}=await axios.post('/user',{name,email,password})

                  console.log(data);
                  return data;
                 
                
                 
            }catch(err){
                console.log(err.response.status);
            }
        }else{
            if (!email || !password) {
                setError('fill all the fields');
            }
            try{
                const config = {
                    headers: {
                      "Content-type": "application/json",
                    },
                  };
                  const { data } = await axios.post(
                    "/user/login",
                    {data:{
                        
                        email,
                        password,
                    }
                    },
                    config,
                    
                  );
                 
            }catch(err){}
        }
    }
	
    return (
        <div className="flex justify-center content-center align-middle min-h-1/2 h-screen ">
    	{/* <img src={Icon} className="app__icon"/> */}
    	<motion.form className="px-10 grid gap-y-8 py-20 w-96 m-auto bg-slate-200"
        initial={{opacity: 0, y: '5rem'}} exit={{opacity: 0, y: '5rem'}} animate={{opacity: 1, y: 0}} layout onSubmit={handleSubmit}>
			<h3 className='my-1'>{signup ? 'Sign Up' : 'Login'}</h3>
			{error && <p className="error">{error}</p>}
			{signup &&
			<div className="my-2 ">
				<label>Full Name</label>
				<input type="text" required={signup} value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe" />
			</div>
			}
			<div className="my-2">
				<label>Email Address</label>
				<input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="johndoe@gmail.com" />
			</div>
			<div className="my-2">
				<label>Password</label>
				<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="••••••••" />
			</div>
			<button type="submit" style={signup ? {backgroundColor: '#f0cf65'} : {backgroundColor: '#5887ff'}} disabled={loading}>{loading ? (signup ? 'Signing up...' : 'Logging In...') : (signup ? 'Create Account' : 'Log In')}</button>
			{/* <button onClick={googleSignIn} className="google">Sign In with Google</button> */}
			<p><span>{signup ? 'Already have an account?' : "Don't have an account?"}{' '}</span><b style={signup ? {color: '#5887ff'} : {color: '#f0cf65'}} onClick={()=>{if(!loading){setSignup(!signup)}}}>Sign Up Now.</b></p>
		</motion.form>
    </div>
    )
}

export default Login
