import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form , setForm ] = useState({
    email : '' ,
    password:'' ,
    role : 'student'
  });
  const navigate = useNavigate()

  const handleChange= (e)=>{
      const {name , value} = e.target;
      setForm((prevData) =>({
        ...prevData , 
        [name] : value
      }))
  };
  const handleSubmit = async  (e) =>{
      e.preventDefault();
      const {email , password , role } = form;
      try {
        const payLoad = {email , password , role}
        const response = await api.post('/auth/register' , payLoad) ;
        console.log("Registration successfully", response.data);
         if(response.data.success === true){
    navigate('/login')
  }
      } catch (error) {
        console.error("Registration failed" ,  error.response?.data?.message || error.response?.data || error.message )
      }
  } ;
 



  return (
   

<div className="min-h-screen flex items-center justify-center bg-gray-100"> 
  <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Create Account
    </h2>

    <input
      type="email" required
      placeholder="Enter Email" value={form.email} name='email' onChange={handleChange}
      className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="password" required
      placeholder="Password" value={form.password} name='password' onChange={handleChange}
      className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <select value={form.role} name='role' onChange={handleChange}
      className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Role</option>
      <option value="student">Student</option>
      <option value="company">Company</option>
    </select>

    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Create Account
    </button>

  </form>
</div>



  )
}

export default Register
