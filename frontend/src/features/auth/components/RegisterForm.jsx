import React, { useState } from 'react'

export default function RegisterForm() {
  const [formData , setformData] = useState({
    email :'',
    password:'',
    role : 'student'
  })

  const handleForm  =  (e)=>{
    const {name , value } = e.target;
  
  setformData(prevData=>({
    ...prevData ,  
    [name]: value
  }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/register',{
      method : 'POST',
      headers : {
        'Content-Type' :'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json()) 
    .then(data => {
      console.log('Success from backend:', data); 
    })
    console.log("Done")
  }

   catch (error) {
    console.log(error.message)
  }
}



  return (
    <form onSubmit={handleSubmit}>
     <div className='flex justify-center '>
      <div className='bg-white flex flex-col w-1/3 justify-center items-center ' >
      <h1 className='text-blue-900 text-2xl dark:text-blue-800'>Register</h1>
        <input name='email' className='border-2 rounded-r-sm w-1/2' onChange={handleForm} required value={formData.email} type="text" />
        <input name='password' className='border-2 rounded-r-sm w-1/2' onChange={handleForm} required  value={formData.password}  type="text" />
        <select name='role' className='border' value={formData.role} required onChange={handleForm}>
          <option value="student">Student</option>
          <option value="admin">admin</option>
          <option value="company">company</option>  
        </select>
        <button type="submit">Create Account</button>
        
      </div>
    </div>
    </form>
  )
}

