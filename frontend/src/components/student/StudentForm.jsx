import React, { useState } from 'react'
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';


function StudentForm() {
  const [form , StudentForm ] = useState({
    fullName :'' ,
    phone:'',
    alternativePhone:'',
    cgpa :'',
    branch :'',
    activeBacklogs:'',
    skills:'',
    experience :'',
    resumeUrl:''
  });
  const navigate = useNavigate();
  const handleChange=(e)=>{
    const {name , value} = e.target;
    StudentForm((prevData)=>({
      ...prevData , 
       [name] : value
    }))
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
   
   try {
      const payLoad = form;
      const token = localStorage.getItem('token');

    const response = await api.post('/student/profile',payLoad,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    navigate("/student")
    console.log("Form submitted ",response.data)
    
   } catch (error) {
    console.error("failed",error.response?.data?.message || error.response?.data || error.message)
   }
  }


  return (
   <>
<div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
  <form className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>

    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      Create Student Profile
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input
        type="text"
        placeholder="Enter Full Name"
        required name='fullName' value={form.fullName} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="tel"
        placeholder="Enter Phone"
        required name='phone' value={form.phone} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="tel"
        placeholder="Enter Alternative Phone" name='alternativePhone' value={form.alternativePhone}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Enter CGPA"
        required min={0} max={10} name='cgpa' value={form.cgpa} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Enter Branch"
        required name='branch' value={form.branch} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number" onChange={handleChange}
        placeholder="Enter Active Backlogs" name='activeBacklogs' value={form.activeBacklogs}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Enter Skills" name='skills' value={form.skills} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Enter Experience" name='experience' value={form.experience} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="url"
        placeholder="Enter Resume URL" name='resumeUrl' value={form.resumeUrl} onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
      />

    </div>

    <button
      type="submit"
      className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Create Profile
    </button>

  </form>
</div>



   </>
  )
}

export default StudentForm
