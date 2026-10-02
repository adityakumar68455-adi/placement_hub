import React from 'react'
import api from '../../api/axios';
import {  toast } from 'react-toastify';
function ProfileUpdateForm({profile , setProfile , onClose}) {
  const handleChange=(e)=>{
    const {name , value } = e.target;
    setProfile((prev)=>({
      ...prev , 
      [name] : value
    }));
    
  };

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await api.put("/student/update" , profile , {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      });
      console.log(response)
      onClose();
    } catch (error) {
      toast.error('Update Failed' , error.response?.data?.message || error.response?.data || error.message)
    }
  }
  return (
    <div>
      <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm'>
       <form className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h1 className='ml-95 text-2xl mb-1 cursor-pointer' onClick={onClose}>X</h1>
  
  

  <div className="space-y-4">

    <input
      type="text"
      value={profile.fullName} onChange={handleChange} name='fullName'
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />

    <input
      type="tel"
     value={profile.phone} onChange={handleChange} name='phone'
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />

    <input
      type="text"
      value={profile.branch} onChange={handleChange} name='branch'
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />

    <input
      type="text"
      value={profile.experience} onChange={handleChange} name='experience'
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />
    <input
      type="text"
      value={profile.skills} onChange={handleChange} name='skills'
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />

    <button
      type="submit" onClick={handleSubmit}
      className="w-full bg-blue-600 text-white py-3 rounded-lg 
                 font-semibold hover:bg-blue-700 
                 active:scale-[0.98] transition duration-200"
    >
      Save
    </button>

  </div>
</form>
      </div>
    </div>
  )
}

export default ProfileUpdateForm
