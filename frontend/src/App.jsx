import React from 'react'
import Student_Dashboard from './student/Student_Dashboard/Student_Dashboard'
import CompanyDashboard from './company/Company_Dashboard/CompanyDashboard'
import LoginForm from './features/auth/components/LoginForm'
import RegisterForm from './features/auth/components/RegisterForm'

import PublicLayout from './features/layout/PublicLayout'
import{Route , Routes} from 'react-router-dom'


export default function App() {
  return (
    <>
    <PublicLayout/>
    {/* <RegisterLoginPage/> */}
<Routes>
  
  <Route path= '/studentDashboard'  element ={<Student_Dashboard/>}/> 
  <Route path='/companyDashboard' element={<CompanyDashboard/> }/>
  <Route path= '/Register'  element ={<RegisterForm/>}/> 
  <Route path= '/Login'  element ={<LoginForm/>}/> 
</Routes>
</>
  )
}
