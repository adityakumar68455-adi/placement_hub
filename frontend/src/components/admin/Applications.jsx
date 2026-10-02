import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../api/axios';

function Applications() {
    const [applications , setApplications] = useState([]);
            useEffect(() => {
            const fetchApplications = async () => {
    
              try {
                  const token = localStorage.getItem('token')
                const response = await api.get('/admin/applications',{
                    headers:{
                        'Authorization' :`Bearer ${token}`
                    }
                });
                console.log(response)
                setApplications(response.data.data);
              } catch (error) {
                console.error('failed fetch applications',error.message || error.response?.data?.message || error.response?.data )
              }
            };
            fetchApplications();
            }, []);
  return (
    <div>
      
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {applications.map((application) => (
    <div
      key={application._id}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
    >
     
      <div className="mb-4">
        <p className="text-xs text-gray-500">
          Application ID
        </p>

        <p className="text-sm font-medium text-gray-700 break-all">
          {application._id}
        </p>
      </div>

      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">
          Status
        </p>

        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          {application.status}
        </span>
      </div>

      
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Student
        </p>

        <p className="font-semibold text-gray-800">
          {application.student?.fullName || "Student not available"}
        </p>
      </div>

      
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Job
        </p>

        <p className="font-semibold text-gray-800">
          {application.job?.title || "Job not available"}
        </p>
      </div>

      
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Feedback
        </p>

        <p className="text-gray-700">
          {application.feedback || "No feedback"}
        </p>
      </div>

      
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Timeline
        </p>

        <p className="text-gray-700">
          {application.timeline?.length || 0} updates
        </p>
      </div>

      
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Applied On
        </p>

        <p className="text-sm text-gray-700">
          {new Date(application.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  ))}
</div>


    </div>
  )
}

export default Applications
