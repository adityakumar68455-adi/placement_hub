import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this!


// React Router
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
// All layouts
import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import CompanyLayout from "./layouts/CompanyLayout.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";

// Admin Side Components
import Dashboard from "./components/admin/Dashboard.jsx"
import GetAllCompany from "./components/admin/GetAllCompanys.jsx";
import GetAllStudent from "./components/admin/GetAllStudents.jsx";
import GetAllJobs from "./components/admin/GetAllJobs.jsx";
import Applications from "./components/admin/Applications.jsx";



// Student Side Components
import StudentDashboard from "./components/student/StudentDashboard.jsx";
import StudentForm from "./components/student/StudentForm.jsx";
import GetallJobs from "./components/student/GetallJobs.jsx";
import StudentProfile from "./components/student/StudentProfile.jsx";
import GetAllApplications from "./components/student/GetAllApplications.jsx";

// Company Side Components
import CompanyDashboard from "./components/company/CompanyDashboard.jsx";
import CompanyForm from "./components/company/CompanyForm.jsx";
import CreateJob from "./components/company/CreateJob.jsx";
import GetJob from "./components/company/GetJob.jsx";
import Profile from "./components/company/Profile.jsx";
import GetApplicants from "./components/company/GetApplicants.jsx";
import CompanyApprovedWait from "./components/company/CompanyApprovedWait.jsx";



// Public Components
import Home from "./components/public/Home.jsx";
import Login from "./components/public/Login.jsx";
import Register from "./components/public/Register.jsx";


export default function App() {
  return (
    <>
    <Routes>

      {/* Admin Side Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
         <Route path="company" element={<GetAllCompany/>}/>
         <Route path="student" element={<GetAllStudent/>}/>
         <Route path="job" element={<GetAllJobs/>}/>
         <Route path='applications' element={<Applications/>}/>
         
      </Route>
      </Route>


      {/* Company Side Routes */}
      <Route element={<ProtectedRoute allowedRoles={['company']}/>}>
      <Route path="/company" element={<CompanyLayout />}>
        <Route index element={<CompanyDashboard />} />
         <Route path="job" element={<GetJob />} />
         <Route path="create" element={<CreateJob />} />
         <Route path="applicants" element={<GetApplicants />} />
         <Route path="profile" element={<Profile/>}/>


      </Route>
        <Route path="/company/form" element={<CompanyForm/>}/>
        <Route path="/wait" element = {<CompanyApprovedWait/>}/>
      </Route>


      {/* Student Side Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']}/>}>
      <Route path="/student" element={< StudentLayout/>}>

        <Route index element={<StudentDashboard/>}/>
        
        <Route path = "applications" element = {<GetAllApplications/>}/>
        <Route path="getjob" element={<GetallJobs />} />
        <Route path="form" element={<StudentForm/>}/>
        <Route path="profile" element={<StudentProfile/>}/>
      </Route>
      </Route>


      {/* Public Side Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

    </Routes>
    {/* <RouterProvider router={router}/> */}
    <ToastContainer />
    </>
  );
}
