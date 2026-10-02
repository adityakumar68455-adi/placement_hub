
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

function GetAllCompany() {

  const [companyData, setCompanyData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [status , setStatus] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/admin/companies', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log("All companies:", response.data);

      
        const companyArray = response.data.jobs || response.data.data || response.data;
        
        if (Array.isArray(companyArray)) {
          setCompanyData(companyArray);
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

  const handleStatus=async(id , newStatus)=>{
    try {
          
        const token = localStorage.getItem('token');
        const res = await api.put(`/admin/company/status/${id}` ,{ status: newStatus }, {
             headers:{
                        'Authorization' : `Bearer ${token}`
                    }});
                    if(res.data.success == true){
                      toast('Updated')
                    }else{
                      toast('failed')
                    }
            console.log("status success" , res);
             setCompanyData(prev => 
                prev.map(company => 
                    company._id === id ? { ...company, verificationStatus: newStatus } : companyData
                )
            );
        
    } catch (error) {
        console.error("Error from company status" ,  error.response?.data?.message || error.response?.data || error.message)
    }

  }
    

  return (
    <>
{companyData.map((company) => (
  <div key={company._id} style={cardStyle}>
    <div>
      <strong>Company Name:</strong> {company.companyName}
    </div>

    <div>
      <strong>Email:</strong> {company.contactEmail}
    </div>

    <div>
      <strong>Location:</strong> {company.location}
    </div>

    <div>
      <strong>Industry:</strong> {company.industry}
    </div>

    <select
      value={company.verificationStatus}
      className="border p-2 text-xl mt-3 rounded-2xl"
      onChange={(e) =>
        handleStatus(company._id, e.target.value)
      }
    >
      <option value="verified">Verified</option>
      <option value="pending">Pending</option>
      <option value="rejected">Rejected</option>
    </select>

    <div>
      Current Status: {company.verificationStatus}
    </div>
  </div>
))}</>
  );
}

const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  width: '300px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  backgroundColor: '#ffffff'
};

export default GetAllCompany;

