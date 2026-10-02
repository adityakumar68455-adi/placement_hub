
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import {  toast } from 'react-toastify';

function GetallJobs() {

  const [jobData, setjobData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/studentDashboard/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log("Get jobs data payload:", response.data);

      
        const jobsArray = response.data.jobs || response.data.data || response.data;
        
        if (Array.isArray(jobsArray)) {
          setjobData(jobsArray);
        } else {
          console.error("API response is still not an array. Check your backend router structure.");
        }

       
        setTotalCount(response.data.count || jobsArray.length || 0);
        
      } catch (error) {
        console.error("error", error.response?.data?.message || error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);
    const handleSubmit= async (jobId)=>{
    try { 
          const token = localStorage.getItem('token');
          console.log(jobId)
       const apply = await api.post('/studentDashboard/apply', {jobId:jobId}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (apply.status === 200 || apply.status === 201) {
        console.log("Apply successful", apply.data);
        alert("Applied successfully!");
      } else{
        toast("you already applied for this job")
      }
     
      
    } catch (error) {
      console.log("Apply failed" , error.response?.data?.message || error.response?.data || error.message)
    }
  }

  return (
  <div className="min-h-screen bg-slate-50 p-6 md:p-8">
  
  {/* Header */}
  <div className="max-w-7xl mx-auto mb-8">
    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-1">
        Job Management
      </p>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
        Total Jobs: 
        <span className="ml-2 text-indigo-600">{totalCount}</span>
      </h1>
    </div>
  </div>

  {/* Job Cards */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {jobData.map((job) => (
      <div
        key={job._id || job.id}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      >

        {/* Job Title */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-xl font-semibold text-slate-800">
            {job.title}
          </h3>

          <span className="shrink-0 px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
            {job.jobType}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-6 text-slate-500 line-clamp-3">
          {job.description}
        </p>

        {/* Job Details */}
        <div className="mt-5 space-y-3 text-sm">

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Location</span>
            <span className="font-medium text-slate-700">
              {job.location}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">CTC</span>
            <span className="font-semibold text-slate-700">
              {job.ctc}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Job Type</span>
            <span className="font-medium text-slate-700">
              {job.jobType}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Deadline</span>
            <span className="font-medium text-slate-700">
              {new Date(job.deadline).toLocaleDateString()}
            </span>
          </div>

        </div>

        {/* Apply Button */}
        <button
          onClick={() => handleSubmit(job._id || job.id)}
          type="button"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition duration-200 shadow-sm hover:shadow"
        >
          Apply Now
        </button>

      </div>
    ))}

  </div>
</div>
  );
}



export default GetallJobs;

