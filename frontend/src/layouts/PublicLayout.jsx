import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function PublicLayout() {
  return (
    <>
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
  <h1 className="text-2xl font-bold text-gray-800">
    Placement Portal
  </h1>

  <nav className="flex gap-6">
    <Link
      to="/register"
      className="text-gray-600 hover:text-blue-600 font-medium"
    >
      Register
    </Link>

    <Link
      to="/login"
      className="text-gray-600 hover:text-blue-600 font-medium"
    >
      Login
    </Link>
  </nav>
</div>

    <div>
      <Outlet/>
    </div>

    <div>
      Footer
    </div>
    
    </>
  )
}

export default PublicLayout
