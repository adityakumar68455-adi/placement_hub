import React ,{useState, useEffect} from 'react'

export default function Student_Dashboard() {
     const [stats, setStats] = useState({
        totalApplications:'' ,
        interviews: '',
        selected: '',
        rejected:'' 
      })
      // const [Loading, setLoading] = useState(false);
    
      useEffect(() => {
        const fetchDashboardData = async () => {
        //   setLoading(true)
          try {
            const token = localStorage.getItem('token')
    
            const response = await fetch('http://localhost:5000/api/studentDashboard/dashboard', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json', // FIX 1: Content-Type ko string me rakha
                'Authorization': `bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json()
              setStats(preventData=>({
                ...preventData , data
              }));
            } 
              console.log("backend ok")
            
          } catch (error) {
            console.error("backend not connected", error);
          }
          //  finally {
          //   setLoading(false)
          // }
        }
        fetchDashboardData()
        },[])
    
        // apply job
    
      //   const hadleApplyJob =async (jobId)=>{
      //     try {
      //       const token = localStorage.getItem('token')
      //       console.log(`apply for job :${jobId}`)
            
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
      // }
  return (
    <div>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>Student Dashboard</h1>
      
      {/* --- STATS CARDS GRID --- */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
        
        <div >
          <h3 >Total Applications</h3>
          <p >{stats.totalApplications}</p>
        </div>

        <div >
          <h3 >Interviews</h3>
          <p >{stats.interviews}</p>
        </div>

        <div >
          <h3 >Selected</h3>
          <p >{stats.selected}</p>
        </div>

        <div >
          <h3 >Rejected</h3>
          <p> {stats.rejected}</p>
        </div>

      </div>

      {/* --- DEMO JOB APPLY SECTION --- */}
      <div style={{ border: '1px solid #e0e0e0', padding: '25px', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>Available Jobs (Frontend Test)</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Position: Full Stack Developer Intern</p>
        <button 
          onClick={() => handleApplyJob("SAMPLE_JOB_ID_999")} 
          style={{ padding: '12px 24px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
        >
          Apply Now
        </button>
      </div>

    </div>
  
    </div>
  )
}
