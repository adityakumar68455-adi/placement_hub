import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

function GetAllStudent() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const handleData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/admin/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = res.data.data;
        setData(payload); 
        
        // 💡 Log 'payload' instead of 'data' to see the immediate result
        console.log("Fetched data:", payload); 
        console.log(data)

      } catch (error) {
        console.error(
          error.response?.data?.message || error.response?.data || error.message
        );
      }
    };

    handleData();
  }, []);

  const handleStatus=async(id)=>{
      try {
         const token = localStorage.getItem('token');
        const res = await api.put(`/admin/student/status/${id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
       
        console.log(res)
      } catch (error) {
        error.response?.data?.message || error.response?.data || error.message
      }
  }


  return (
    <div>
   {data.map((student) => (
  <div
    key={student._id}
    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {student.fullName}
        </h2>
        <p className="text-sm text-gray-500">
          {student.branch}
        </p>
      </div>

      <button onClick={()=>{handleStatus(student._id)}}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          student.eligibilityStatus
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {student.eligibilityStatus ? "Eligible" : "Not Eligible"}
      </button>
      
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">CGPA:</span>{" "}
        {student.cgpa}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">Phone:</span>{" "}
        {student.phone}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">Email:</span>{" "}
        {student.user?.email}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold text-gray-800">URL:</span>{" "}
        {student.url}
      </p>
    </div>
   
  </div>
  
))}
    </div>
  );
}

export default GetAllStudent;
