import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import api from '../../api/axios'

function GetAllJobs() {
    const [jobs , setJobs] = useState([]);
        useEffect(() => {
        const fetchJobs = async () => {

          try {
              const token = localStorage.getItem('token')
            const response = await api.get('/admin/jobs',{
                headers:{
                    'Authorization' :`Bearer ${token}`
                }
            });
            console.log(response)
            setJobs(response.data.data);
          } catch (error) {
            console.error('failed fetch jobs',error.message || error.response?.data?.message || error.response?.data )
          }
        };
        fetchJobs();
        }, []);
        const handleStatus=async(id ,currentStatus)=>{
          try {
            const token = localStorage.getItem('token')
            const response = await api.put(`/admin/job/${id}/close`,{status: currentStatus} ,{
                headers:{
                    'Authorization' :`Bearer ${token}`
                }
            });
            console.log(response)
            window.location.reload()
   
          } catch (fetchError) { // Changed 'error' to 'fetchError' to avoid conflicts
                console.error('failed fetch jobs', fetchError.message || fetchError.response?.data?.message || fetchError.response?.data);
            }
        }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {jobs.map((job) => (
    <div
      key={job._id}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {job.title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {job.company.companyName}
          </p>
        </div>

        <button  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold" onClick={()=>handleStatus(job._id ,job.status)}> 
          {job.status}
        </button>
      </div>

      {/* Job Details */}
      <div className="space-y-3 text-sm">

        <p>
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          <span className="text-gray-600">
            {job.company.contactEmail}
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">CTC:</span>{" "}
          <span className="text-gray-600">
            {job.ctc}
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Deadline:</span>{" "}
          <span className="text-gray-600">
            {job.deadline}
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Job Type:</span>{" "}
          <span className="text-gray-600">
            {job.jobType}
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Location:</span>{" "}
          <span className="text-gray-600">
            {job.location}
          </span>
        </p>

        <p>
          <span className="font-semibold text-gray-700">Minimum CGPA:</span>{" "}
          <span className="text-gray-600">
            {job.minCgpaCriteria}
          </span>
        </p>
      </div>

      {/* Description */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-2">
          Description
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed">
          {job.description}
        </p>
      </div>

      
    </div>
  ))}
</div>
    </div>
  )
}

export default GetAllJobs
