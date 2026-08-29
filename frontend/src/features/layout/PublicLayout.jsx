import React from 'react'
import {Link } from 'react-router-dom'
  
export default function PublicLayout() {
  return (
    <div className='bg-white h-16' >
      <nav>
        <Link to="/" className='p-7 text-2xl mt-0.5'>Job Portal</Link>
        <Link to="/register" className=''>Register</Link>
        <Link to="/login">Log in</Link>
      </nav>
    </div>
  )
}
