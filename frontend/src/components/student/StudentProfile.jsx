import React, { useEffect , useState} from 'react'
import ProfileUpdateForm from './ProfileUpdateForm';

import api from '../../api/axios';

function StudentProfile() {
  
  const [profile , setProfile] = useState({
     fullName :'',
      phone:'', 
      alternativePhone :'', 
      cgpa :'', 
      branch :'',
       activeBacklogs :'', 
       skills :'', 
       experience :'',
        resumeUrl :'' 
  });

  const [showUpdate , setShowUpdate] = useState(false);



  useEffect(()=>{
      const handleProfile= async()=>{
    try {
        const token = localStorage.getItem('token');

        const response = await api.get('/student/read',{
          headers:{
            'Authorization' : `Bearer ${token}`
          }
        });
        const res = response.data.data;
        
        setProfile(res)
       
      }
     catch (error) {
      console.error(error.response?.data?.message || error.response?.data || error.message)
    } 
  }
  ;

    handleProfile();

},[]);

  const handleEdit=async()=>{

  }



  return (

        
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
 
  
  <h1 className="text-3xl font-bold text-gray-800 mb-6">
    {profile.fullName}
  </h1>

  <div className="space-y-4">

    <div>
      <p className="text-sm font-semibold text-gray-500">Phone</p>
      <p className="text-gray-700 mt-1">
        {profile.phone}
      </p>
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-500">Branch</p>
      <p className="text-gray-700 mt-1">
       {profile.branch}
      </p>
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-500">Experience</p>
      
        <h1 className="text-blue-600 hover:text-blue-800 hover:underline">
          {profile.experience}
        </h1>
      
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-500">Skills</p>
      <p className="text-gray-700 mt-1">
        {profile.skills}
      </p>
    </div>
    <div className='border bg-blue-500 w-25 ml-60 flex justify-center rounded-2xl '>
      <button className='p-3 w-full cursor-pointer' onClick={()=>{handleEdit , setShowUpdate(true)}} >Edit</button>
    </div>


  </div>
  
  {showUpdate && <ProfileUpdateForm profile ={profile} setProfile= {setProfile} onClose={()=>setShowUpdate(false)}/>}
</div>
  )

}
  


export default StudentProfile
