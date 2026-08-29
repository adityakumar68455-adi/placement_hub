import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'


export default function LoginForm() {
  const navigate = useNavigate(); 

  const [ formData , setformData ] = useState({
    email : '' , 
    password : ''
  })

  const handleForm = (e) =>{
    const {name , value} = e.target;
  
    setformData(prevData=>({
    ...prevData ,  
    [name]: value
  }))
  }
    const handleSubmit = async (e) =>{
    e.preventDefault()
  

  try {
    let response = await fetch('http://localhost:5000/api/auth/login', {
      method : 'POST' ,
      headers :{'Content-Type':'application/json' },
      body :JSON.stringify(formData)})
      const data = await response.json()
        console.log("Success from backend" , data)
        
      
      console.log("Done")
       
       const token = data.token;
       localStorage.setItem('userToken', token)

       const decode = jwtDecode(token)
       const userRole = decode.role

       if(userRole === 'student'){
        navigate('/studentDashboard')
       }
       else if(userRole === 'company'){
        navigate('/companyDashboard')
       }
       else if(userRole === 'admin'){
        navigate('/adminDashboard')
       }

    

  } catch (error) {
    console.log("Login" ,error)
  }
}




  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='flex justify-center '>
      <div className='bg-white flex flex-col w-1/3 justify-center items-center' >
      <h1 className='text-blue-900 text-2xl dark:text-blue-800'>Login</h1>
        <input name='email' className='border-2 rounded-r-sm w-1/2' value={formData.email} onChange={handleForm} type="email" />
        <input name='password' className='border-2 rounded-r-sm w-1/2' value={formData.password} onChange={handleForm} type="password" />
        <button  type="submit">Login </button>
        
      </div>
      </div>
      </form>
      </>
    
  )
}