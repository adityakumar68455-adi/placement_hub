import React, { useEffect, useState } from 'react'
import api from '../../api/axios';

function Dashboard() {
  const [dashboard, setDashboard] = useState({
  systemOverview: {
    totalRegisteredUsers: '',
    totalRegisteredStudents: '',
    placedStudents: '',
    placementRate: ''
  },

  companyMetrics: {
    totalCompanies: '',
    breakdown: {
      pending: '',
      verified: '',
      rejected: ''
    }
  },

  jobMarketMetrics: {
    jobsOverview: [],

      applicationFunnel: {
      applied: '',
      shortlisted: '',
      interviewing: '',
      selected: '',
      rejected: ''
    }
  },

  recentActivityTrails: []
});
          
       
      const [loading,setLoading] = useState(true)
      const [error,setError] = useState("")


      useEffect(()=>{
       const fetchDashboard =async ()=>{
      try {

           const token = localStorage.getItem('token')
           const response = await api.get('/admin/dashboard', {
            headers:{
              'Authorization' : `Bearer ${token}`
            }
           });
           console.log('Fetch admin',response)

           
       setDashboard(response.data.data) 
        
      
        
      } catch (error) {
        console.log("dashboard not fetched", error)
        setError(error.response?.data?.message || "Failed to load dashboard"
        );
     
      } finally {
        setLoading(false)
      }
      }
     fetchDashboard();
    }
     ,[])
    

  
  return (
   <div className="p-6">

    <h1 className="text-2xl font-bold mb-6">
      Admin Dashboard
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Total Users
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.systemOverview.totalRegisteredUsers || 0}
        </p>
      </div>


      {/* Total Students */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Total Students
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.systemOverview.totalRegisteredStudents || 0}
        </p>
      </div>


      {/* Placed Students */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Placed Students
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.systemOverview.placedStudents || 0}
        </p>
      </div>


      {/* Placement Rate */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Placement Rate
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.systemOverview.placementRate || 0}
        </p>
      </div>



      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Companies
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.companyMetrics.totalCompanies || 0}
        </p>
      </div>


     
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Pending
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.companyMetrics.breakdown.pending || 0}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          verified
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.companyMetrics.breakdown.verified|| 0}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          rejected
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.companyMetrics.breakdown.rejected|| 0}
        </p>
      </div>









{/* jobMarketMetrics: {
    jobsOverview: [],

      applicationFunnel: {
      applied: '',
      shortlisted: '',
      interviewing: '',
      selected: '',
      rejected: ''
    } */}
      {/* Placed Students */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 >
          JobOverview
        </h2>
        <h1> Applied.</h1>
        <p className="text-3xl font-bold mt-2">
          {dashboard.jobMarketMetrics.applicationFunnel.applied|| 0}
        </p>
      </div>


      {/* Placement Rate */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Shortlist
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.jobMarketMetrics.applicationFunnel.shortlisted|| 0}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Interview
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.jobMarketMetrics.applicationFunnel.interviewing|| 0}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Selected
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.jobMarketMetrics.applicationFunnel.selected|| 0}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500 text-sm">
          Rejected
        </h2>

        <p className="text-3xl font-bold mt-2">
          {dashboard.jobMarketMetrics.applicationFunnel.rejected|| 0}
        </p>
      </div>

    </div>

  </div>
  )
}

export default Dashboard;
