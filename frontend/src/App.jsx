import React from "react";

// React Router
import { Route, Routes } from "react-router-dom";

// All layouts
import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import CompanyLayout from "./layouts/CompanyLayout.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";

// Admin Side Components
import Dashboard from "./components/admin/Dashboard.jsx";

// Student Side Components
import StudentDashboard from "./components/student/StudentDashboard.jsx";
import StudentForm from "./components/student/StudentForm.jsx";

// Company Side Components
import CompanyDashboard from "./components/company/CompanyDashboard.jsx";
import CompanyForm from "./components/company/CompanyForm.jsx"


// Public Components
import Home from "./components/public/Home.jsx";
import Login from "./components/public/Login.jsx";
import Register from "./components/public/Register.jsx";


export default function App() {
  return (
    <Routes>

      {/* Admin Side Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>


      {/* Company Side Routes */}
      <Route path="/company" element={<CompanyLayout />}>
        <Route index element ={<CompanyForm/>}/>
        <Route index element={<CompanyDashboard />} />
      </Route>


      {/* Student Side Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentForm/>}/>
        <Route index element={<StudentDashboard />} />
      </Route>


      {/* Public Side Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

    </Routes>
  );
}
