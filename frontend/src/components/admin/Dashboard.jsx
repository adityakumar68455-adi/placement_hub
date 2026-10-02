import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [stats,setStats] = useState({
    totalRegisteredUser:'',    totalCompanies: '',
    totalStudents: '',
    totalCompanies:'',
    totalPlaced:'',
    placementRate:'',
    pendingCompanies:'',  
  })
 
  const [loading,setLoading]=useState(false)
  const [error,setError] = useState(null)

   const [rejectingCompanyId, setRejectingCompanyId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // useEffect(() =>{

  // })
  const [companies ,setCompanies] = useState([
     {
      _id: "1",
      companyName: "Tech Mahindra",
      industry: "IT Services",
      user: { email: "hr@techmahindra.com" },
      verificationStatus: "pending"
    },
    {
      _id: "2",
      companyName: "Google India",
      industry: "Software & Technology",
      user: { email: "recruiting@google.com" },
      verificationStatus: "verified"
    }
  ])
  
  const handleVerifyAction = (id, targetStatus) => {
    setCompanies(prev => 
      prev.map(item => item._id === id ? { ...item, verificationStatus: targetStatus } : item)
    )};
 
   if (loading) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Loading...</div>;
  }
   return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'left' }}>
      
      {/* 🔝 Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Admin Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Welcome to your normal screen view.</p>
      </div>

      {/* 📊 Analytics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        <div style={{ backgroundColor: '#white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', background: '#fff' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' }}>Total Registered Users</span>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '8px 0 0 0' }}>142</h3>
        </div>

        <div style={{ backgroundColor: '#white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', background: '#fff' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' }}>Total Companies</span>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '8px 0 0 0' }}>28</h3>
        </div>

        <div style={{ backgroundColor: '#white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', background: '#fff' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' }}>Placed Students</span>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '8px 0 0 0' }}>45</h3>
        </div>

        <div style={{ backgroundColor: '#white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', background: '#fff' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' }}>Placement Rate</span>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '8px 0 0 0' }}>39.47%</h3>
        </div>

      </div>

      {/* 🏢 Company Registry Table Preview */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Company Approval Queue Preview</h2>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', color: '#4b5563', textTransform: 'uppercase', fontSize: '12px', textAlign: 'left' }}>
                <th style={{ padding: '12px 24px' }}>Company Name</th>
                <th style={{ padding: '12px 24px' }}>HR Email</th>
                <th style={{ padding: '12px 24px' }}>Status</th>
                <th style={{ padding: '12px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>Tech Mahindra</td>
                <td style={{ padding: '16px 24px', color: '#4b5563' }}>hr@techmahindra.com</td>
                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>pending</span></td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', marginRight: '8px', cursor: 'pointer' }}>Approve</button>
                  <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Reject</button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#111827' }}>Google India</td>
                <td style={{ padding: '16px 24px', color: '#4b5563' }}>recruiting@google.com</td>
                <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>verified</span></td>
                <td style={{ padding: '16px 24px', textAlign: 'right', color: '#9ca3af', fontSize: '12px', fontStyle: 'italic' }}>Verified</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard
