import React from 'react'
import { useState } from 'react';
import api from '../../api/axios'
import { toast } from 'react-toastify';

function JobUpdateForm({ setJobData,job , onShow }) {
   const [form, setForm] = useState({
    title: job?.title || '',
    description: job?.description || '',
    location: job?.location || '',
    ctc: job?.ctc || '',
    jobType: job?.jobType || '',
    deadline: job?.deadline
      ? job.deadline.slice(0, 10)
      : ''
  })
    const handleFrom = (e)=>{
       const {name  , value} = e.target;
        setForm((prev)=>({
            ...prev , 
            [name] : value
        }));
      
       } ;
    const handleSubmit = async (e) => {
    e.preventDefault();
     try {

      const token = localStorage.getItem('token');

      const response = await api.put(
        `/jobs/update/${job._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if(response.data.success == true){
        toast('Update successful')
      }else{
        toast("failed update")
      }
      console.log('Job updated:', response.data);
    setJobData((prevJobs) =>
      prevJobs.map((item) =>
        item._id === job._id
          ? { ...item, ...form }
          : item
      )
    );
      onShow();

    } catch (error) {

      console.log(
        'Update failed:',
        error.response?.data?.message ||
        error.response?.data ||
        error.message
      );

    }
  };
       
    
  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm'>
      <div >
  <form className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4" onSubmit={handleSubmit} >
        <button className='ml-110 text-2xl' onClick={onShow}>X</button>
  <input
    type="text" name='title' value={form.title}
    placeholder="Enter Title" onChange={handleFrom}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="text" name='description' value={form.description}
    placeholder="Enter Description" onChange={handleFrom}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="text"  value={form.location}
    placeholder="Enter Location"  name='location' onChange={handleFrom}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="number" value={form.ctc}
    placeholder="Enter CTC" name='ctc' onChange={handleFrom}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select name='jobType' onChange={handleFrom} value={form.jobType}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Job Type</option>
    <option value="Full-time">Full-time</option>
    <option value="Part-time">Part-time</option>
    <option value="Internship">Internship</option>
  </select>

  <input
    type="date" name='deadline' onChange={handleFrom} value={form.deadline}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
    <button type='submit' className='w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500' >Update</button>
    </form>
</div>
    </div>
  )
}

export default JobUpdateForm
