import React from 'react'
import { Outlet , Link } from 'react-router-dom'

function StudentLayout() {
  return (
    <>
  
<nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">

  <Link
    to="/student"
    className="text-xl font-bold text-gray-800 hover:text-blue-600"
  >
    Placement Portal
  </Link>

  <div className="flex items-center gap-6">
    <Link
      to="/profile"
      className="text-gray-600 hover:text-blue-600"
    >
      Profile
    </Link>

    <Link
      to="/"
      className="text-gray-600 hover:text-red-600"
    >
      Logout
    </Link>
  </div>

</nav>


    <div>
      <Outlet/>
    </div>
    </>
  )
}

export default StudentLayout
