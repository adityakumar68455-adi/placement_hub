import React from 'react'
import { Outlet, Link } from 'react-router-dom';

function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Top Navbar (Sticky) */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white shadow-sm border-b">
        <Link
          to=""
          className="text-xl font-bold text-gray-800 hover:text-blue-600"
        >
          Placement Portal
        </Link>

        <div className="flex items-center gap-6">
          {/* <Link
            to=""
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Profile
          </Link> */}
          <Link
            to=""
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/" 
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 font-medium"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* 2. Main Page Layout Container */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r p-5 min-h-[calc(100vh-4rem)] sticky top-16">
         

          <nav className="space-y-1">
            <Link
              to="/admin/applications"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Applications
            </Link>
            <Link
              to="/admin/job"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
               Get Jobs
            </Link>
            <Link
              to="/admin/student"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Students
            </Link>
            <Link
              to="/admin/company"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              All company
            </Link>
          </nav>
        </aside>

        {/* Right Content Area where child views load */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout;
