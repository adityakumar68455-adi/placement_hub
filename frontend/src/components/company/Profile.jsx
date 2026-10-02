import React, { useEffect , useState} from 'react'
import ProfileForm from './ProfileForm';
import api from '../../api/axios';

function Profile() {
  const [show , setShow] = useState(false)
  const [profile , setProfile] = useState({
    companyName : '',
            industry : '',
            description : '',
            location : '',
            website: '',
            contactEmail:''
  });


  useEffect(()=>{
      const handleProfile= async()=>{
    try {
        const token = localStorage.getItem('token');

        const response = await api.get('/company/Profile',{
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



  return (

        
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
 
  
  <h1 className="text-3xl font-bold text-gray-800 mb-6">
    {profile.companyName}
  </h1>

  <div className="space-y-4">

    <div>
      <p className="text-sm font-semibold text-gray-500">Description</p>
      <p className="text-gray-700 mt-1">
        {profile.description}
      </p>
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-500">Location</p>
      <p className="text-gray-700 mt-1">
       {profile.location}
      </p>
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-500">Website</p>
      <a
        href={profile.website}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline rounded-4xl"
      >
        {profile.website}
      </a>
    </div>

    <div>
      <p className="text-sm font-semibold text-gray-500">Contact Email</p>
      <p className="text-gray-700 mt-1">
        {profile.contactEmail}
      </p>
    </div>


  </div>
  <div>
    <button className='border p-3 w-52 bg-blue-500  h-12 ' onClick={()=> setShow(true)}>Edit</button>
  </div>
  
  {show && <ProfileForm profile={profile} setProfile={setProfile} onClose={()=>setShow(false)}/>}
</div>
  )

}
  


export default Profile
