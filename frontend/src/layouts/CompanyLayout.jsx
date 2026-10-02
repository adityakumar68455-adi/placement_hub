
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../api/axios";

function CompanyLayout() {

 
  const handleLogout=()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("role")
  }
  
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="h-16 flex items-center justify-between px-6 bg-white shadow-sm border-b">

        <Link
          to="/company"
          className="text-xl font-bold text-gray-800"
        >
          Company Panel
        </Link>
      </nav>

            {/* Sidebar + Dashboard */}
      <div className="flex">

        
         <aside className="w-64 shrink-0 min-h-[calc(100vh-4rem)] bg-white border-r p-5">

          

          <nav className="space-y-2">
              <Link
            to="/company"
            className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50"
          >
            Dashboard
          </Link>

            <Link
              to="/company/create"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50"
            >
               Create Job
            </Link>

            <Link
              to={`/company/Job`}
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50"
            >
               Get Jobs
            </Link>
            <Link
              to={`/company/applicants`}
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50"
            >
              Applicants
            </Link>
            <Link
             to='/company/profile'
            className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50"
          >
            Profile
          </Link>

          <Link
            to="/"
            className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50" onClick={handleLogout}
          >
            Logout
          </Link>
           

            

          </nav>

        </aside>


        {/* Dashboard */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main> 

      </div>


    </div>
  );
}

export default CompanyLayout;

