import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({allowedRoles}) => {
  // Replace this with your actual auth logic (e.g., checking localStorage or global context)
  const isAuthenticated = !!localStorage.getItem("token"); 
    const userRole = localStorage.getItem('role');

  // If not authenticated, redirect to the login page immediately
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />; 
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
