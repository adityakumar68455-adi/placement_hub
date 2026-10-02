import React from 'react'
import { useEffect } from 'react'
import api from "../../api/axios"
import { useState } from 'react';


function GetAllApplications() {
  const [data , setData] = useState([]);
   useEffect(()=>{
      const handleApplications= async()=>{
    try {
        const token = localStorage.getItem('token');

        const response = await api.get('/studentDashboard/applications',{
          headers:{
            'Authorization' : `Bearer ${token}`
          }
        });
        const res = response.data.data;
        setData(res)
        console.log(res)

        
        
       
      }
     catch (error) {
      console.error(error.response?.data?.message || error.response?.data || error.message)
    } 
  }
  ;

    handleApplications();

},[]);
  return (
 <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Applied Jobs</h1>
  <div className="grid gap-4 md:grid-cols-2">
    {data.map((application) => (
      <div key={application._id} className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
        
        <div className="mb-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Position</span>
          <h2 className="text-xl font-semibold text-gray-900">{application.job.title}</h2>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-evenly">
            <span className="text-gray-500">Job Posting Status:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              application.job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {application.job.status}
            </span>
          </div>

          <div className="flex items-center justify-evenly">
            <span className="text-gray-500">Application Status:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              application.status === 'Approved' || application.status === 'Accepted'
                ? 'bg-blue-100 text-blue-800' 
                : application.status === 'Pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {application.status}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500">Applicant:</span>
          <span className="font-medium text-gray-700">{application.student.fullName}</span>
        </div>

      </div>
    ))}
  </div>
</div>
 
  )
}

export default GetAllApplications
