import { useState } from "react"
import React from 'react'
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";


function CompanyFOrm() {
  const navigate = useNavigate();
  const [form,setForm] = useState({
      companyName : '',
            industry : '',
            description : '',
            location : '',
            website: '',
            contactEmail:''
          });

 const handleChange=(e)=>{
    const {name , value} = e.target;
    setForm((prevData)=>({
      ...prevData , 
       [name] : value
    }))
  };

const handleSubmit = async(e) =>{ 
    e.preventDefault();
                try {
                    const payLoad = form;
                    const token = localStorage.getItem('token');
                    const response = await api.post('/company/createProfile',payLoad,{
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        }
                        
                })
                    console.log("form submitted successfully",response.data);
                     if(response.success || response){
                      alert('Profile created successfuly')
                     } else {
                      alert("some thing wrong")
                     }
                     if(response.data.success===true && response.data.verificationStatus === 'pending'){
                      navigate('/wait')
                     } 
                     else{
                      alert('Comapny form failed')
                     }


                } catch (error) {
                  alert(error.response?.data?.message || error.response?.data || error.message)
                     console.error(" company formed failed",error.response?.data?.message || error.response?.data || error.message)
                     };
                    
    }
 
return (
 
<div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
  <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">

    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Create Company Profile
      </h1>

      <p className="text-gray-500 mt-1">
        Complete your company profile to access your dashboard.
      </p>
    </div>

    <form onSubmit={handleSubmit}>

      {/* Company Name */}
      <div className="mb-4">
        <label
          htmlFor="companyName"
          className="block mb-1 font-medium text-gray-700"
        >
          Company Name
        </label>

        <input
          id="companyName"
          type="text"
          name="companyName"
          placeholder="Enter company name"
          value={form.companyName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Industry + Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="mb-4">
          <label
            htmlFor="industry"
            className="block mb-1 font-medium text-gray-700"
          >
            Industry
          </label>

          <input
            id="industry"
            type="text"
            name="industry"
            placeholder="e.g. Information Technology"
            value={form.industry}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block mb-1 font-medium text-gray-700"
          >
            Location
          </label>

          <input
            id="location"
            type="text"
            name="location"
            placeholder="e.g. Delhi, India"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-gray-700"
        >
          Company Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Tell us about your company..."
          value={form.description}
          onChange={handleChange}
          rows="5"
          required
          className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Website + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="mb-4">
          <label
            htmlFor="website"
            className="block mb-1 font-medium text-gray-700"
          >
            Company Website
          </label>

          <input
            id="website"
            type="url"
            name="website"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactEmail"
            className="block mb-1 font-medium text-gray-700"
          >
            Contact Email
          </label>

          <input
            id="contactEmail"
            type="email"
            name="contactEmail"
            placeholder="company@example.com"
            value={form.contactEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      <button
        type="submit"
        className="w-full mt-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Company Profile
      </button>

    </form>
  </div>
</div>


);


}

export default CompanyFOrm
