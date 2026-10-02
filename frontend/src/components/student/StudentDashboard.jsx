import React, { useState } from 'react'
import { useEffect } from 'react'
import api from '../../api/axios.js'

function StudentDashboard() {
  const [dashboard , setDashboard ] = useState({});

  useEffect(()=>{
      const fetchDashboard = async ()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/studentDashboard/dashboard",{
        headers :{
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Dashboard successful", response.data);
      setDashboard(response.data)
    } catch (error) {
      console.error("Dashboard failed" , error.response?.data?.message ||
          error.response?.data ||
          error.message)
    } 
  };
  fetchDashboard();
  },[]);

 
    

  return (
 
<div className="min-h-screen bg-gray-100 p-6">

  <h1 className="text-3xl font-bold text-gray-800 mb-6">
    Student Dashboard
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Total Applications */}
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">
        Total Applications
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {dashboard.totalApplications
 }
      </h2>
    </div>
    

    {/* Interviews */}
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">
        Interviews
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {dashboard.interviews }
      </h2>
    </div>

    {/* Selected */}
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">
        Selected
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {dashboard.selected }
      </h2>
    </div>

    {/* Rejected */}
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">
        Rejected
      </p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">
        {dashboard.rejected }
      </h2>
    </div>

  </div>

</div>


  )
}

export default StudentDashboard
