import React from 'react'
import api from '../../api/axios'
import { useEffect } from 'react'
import { useState } from 'react'

function GetApplicants() {
    const [applicants , setApplicants] = useState([]);
    const [status , setStatus]= useState(null)
    useEffect(()=>{
        const applicants=async()=>{

            try {
                
                const token = localStorage.getItem('token')
                const response = await api.get('/companyDashboard/applicants',{
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                });
                console.log('applicants' , response.data.data)
                const applicants = response.data.data
                setApplicants(applicants)
            } catch (error) {
                console.log(error)
            }
        }
        applicants();
    },[]);
    const handleStatus=async(id, newStatus)=>{
        try {

           const token = localStorage.getItem('token')
                const response = await api.put(`/companyDashboard/application/${id}`, { status: newStatus },{
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                });
                console.log("successfully" , response);
                 setApplicants(prevApplicants => 
                prevApplicants.map(applicant => 
                    applicant._id === id ? { ...applicant, status: newStatus } : applicant
                )
            );
           
        } catch (error) {
            console.log('failed' ,  error.response?.data?.message ||
            error.response?.data ||
            error.message)
        }
    }
    
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 max-w-7xl mx-auto">
  {applicants.map((applicant) => (
    <div
      key={applicant._id}
      className="flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition duration-200"
    >
      <div>
        {/* Header Block: Status Badges and Selection */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${
            applicant.status === 'selected' ? 'bg-green-100 text-green-800' :
            applicant.status === 'rejected' ? 'bg-red-100 text-red-800' :
            applicant.status === 'shortlisted' ? 'bg-purple-100 text-purple-800' :
            applicant.status === 'interviews' ? 'bg-amber-100 text-amber-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {applicant.status}
          </span>
          
          <select
            onChange={(e) => handleStatus(applicant._id, e.target.value)}
            value={applicant.status}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition cursor-pointer"
          >
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviews">Interviewing</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Student Information Section */}
        <div className="space-y-3 mb-6">
          <div>
            <span className="block text-xs font-medium uppercase tracking-wider text-gray-400">Student Name</span>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">{applicant.student.fullName}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="block text-xs font-medium text-gray-400">CGPA</span>
              <span className="text-base font-semibold text-gray-800">{applicant.student.cgpa}</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-400">Phone</span>
              <span className="text-base font-medium text-gray-600">{applicant.student.phone}</span>
            </div>
          </div>

          <div className="pt-1">
            <span className="block text-xs font-medium text-gray-400 mb-1">Resume</span>
            {applicant.student.resumeUrl ? (
              <a 
                href={applicant.student.resumeUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                View Document →
              </a>
            ) : (
              <span className="text-sm text-gray-400 italic">Not provided</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Block: Applied Job Info */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Position Applied</span>
        <h3 className="text-base font-semibold text-gray-800 mt-0.5">
          {applicant.job.title}
        </h3>
      </div>
    </div>
  ))}
</div>

  )
}

export default GetApplicants
