import React, { useState } from 'react'
import './Css/loginsignup.css'
export default function LoginSignup() {
  const [state,setState] = useState("Login")
  const [formData,SetFormDate] = useState({
    username:"",
    password:"",
    email:"",
  })
  const login = async()=>{
    let responseData;
    await fetch("https://e-commerce-backend-91i0.onrender.com/login",{
       method:"POST",
       headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
       },
       body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=> {responseData = data})
    if(responseData.success)
    {
       localStorage.setItem('auth-token',responseData.token);
       window.location.replace("/");
    }
    else{
      alert(responseData.error);
    }
  }
  const signup = async()=>{
    let responseData;
    await fetch("https://e-commerce-backend-91i0.onrender.com/signup",{
       method:"POST",
       headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
       },
       body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=> {responseData = data})

    if(responseData.success)
    {
       localStorage.setItem('auth-token',responseData.token);
       window.location.replace("/");
    }
    else{
      alert(responseData.error);
    }
  }
  const handleChange = (e)=>{
        SetFormDate({...formData,[e.target.name]:e.target.value})
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
         <h1>{state}</h1>
         <div className="loginsignup-fields">
          {state === "Signup"?<input type="text" onChange={handleChange} name='username' value={formData.username} placeholder='Enter your name'/>:<></>}
           <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email Address' />
           <input name='password' value={formData.password} onChange={handleChange} type="password" placeholder='Password' />
           </div>
           <button onClick={state === "Login"?login:signup}>Continue</button>
          {state === "Signup"? <p className="loginsignup-login">Already have an account? <span onClick={()=>setState("Login")} >Login here</span>
           </p>: <p className="loginsignup-login">Create an account? <span onClick={()=>setState("Signup")}>Click here</span>
           </p>}
           <div className="loginsignup-agree">
              <input type="checkbox" name='' id=''/>
              <p>By continuing, i agree to the terms of use & privacy policy </p>
           </div>
        
      </div>
      
    </div>
  )
}
