import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

function Login() {
  const [form ,setForm] = useState({
    email : '',
    password : ''
  });
  const navigate = useNavigate();
   const handleChange= (e)=>{
      const {name , value} = e.target;
      setForm((prevData) =>({
        ...prevData , 
        [name] : value
      }))
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {email , password} = form;

    try {
      const payLoad = {email , password};
      const response = await api.post('/auth/login', payLoad);
      if(response.data.success == true){
        toast('Login successful')
      }
      else{
        toast('Failed')
      }
      console.log("login Successfully ", response.data ) ;
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('role',response.data.user.role);
      const userRole = localStorage.getItem('role')

      if(userRole === 'student'&& response.data.user.hasProfile === false ){
        navigate('/student/form')
      }
      else if(userRole === 'student' && response.data.user.hasProfile === true){
        navigate('/student')
      }
      else if(userRole === 'company' && response.data.user.hasProfile === false){
        navigate('/company/form')
      }
      else if(userRole === 'company' && response.data.user.hasProfile === true && response.data.user.verificationStatus === "pending"){
        navigate('/wait')
      }
      else if(userRole === 'company' && response.data.user.hasProfile === true && response.data.user.verificationStatus === "verified"){
        navigate('/company')
      }
      else if(userRole === 'company' && response.data.user.hasProfile === true && response.data.user.verificationStatus === "rejected"){
        navigate('/wait')
      }
      else if(userRole === 'admin'&& response.data.user.hasProfile === false){
        navigate('/admin')
      }
      

    } catch (error) {
      toast.error( 'login failed',error.response?.data?.message || error.response?.data || error.message);

    }
  }


  return (
    <div>
    
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Login
    </h2>

    <input
      type="email" value={form.email} name='email'
      placeholder="Enter Email" onChange={handleChange} required
      className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input 
      type="password" value={form.password} name='password'
      placeholder="Enter Password" onChange={handleChange} required
      className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Login
    </button>

  </form>
</div>


    </div>
  )
}

export default Login
