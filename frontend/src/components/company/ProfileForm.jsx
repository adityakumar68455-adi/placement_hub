import React, { useState } from 'react'
import { createIcons, X } from 'lucide';
import api from '../../api/axios'



function ProfileForm({profile , setProfile,onClose}) {
    const handleChange=(e)=>{
        const {name , value} = e.target;
        setProfile((prev)=>({
            ...prev , 
            [name]:value
        }))
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token')
         
         try {
          const response = await api.put('/company/updateProfile',profile,{
            headers:{
              'Authorization' : `Bearer ${token}`
            }
          }); 
          
          setProfile(response.data.data)
         } catch (error) {
          console.error(error.response?.data?.message || error.response?.data || error.message)
         }
         onClose();
    }

    
  return (
    <div className='fixed inset-0 bg-blue-200 backdrop-blur-sm'>
      <div>
        
        
<form className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-5" onSubmit={handleSubmit}>

  
  <div>
    <button onClick={onClose} className='ml-150 text-2xl' >X</button>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Company Name
    </label>
    <input
      type="text" value={profile.companyName}
      name="companyName"  onChange={handleChange}
      placeholder="Enter company name"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Industry */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Industry
    </label>
    <input
      type="text" value={profile.industry}
      name="industry" onChange={handleChange}
      placeholder="e.g. IT, Finance, Healthcare"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Description
    </label>
    <textarea
      name="description" value={profile.description} onChange={handleChange}
      rows="4"
      placeholder="Enter company description"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>

  {/* Location */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Location
    </label>
    <input
      type="text" value={profile.location} onChange={handleChange}
      name="location"
      placeholder="e.g. Delhi, India"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Website */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Website
    </label>
    <input value={profile.website} onChange={handleChange}
      type="url"
      name="website"
      placeholder="https://example.com"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Contact Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Contact Email
    </label>
    <input
      type="email" value={profile.contactEmail} onChange={handleChange}
      name="contactEmail"
      placeholder="company@example.com"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 rounded-lg
               hover:bg-blue-700 transition duration-200 font-medium"
  >
    Save
  </button>

</form>


      </div>
    </div>
  )
}

export default ProfileForm
