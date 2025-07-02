import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return redirect ? <Navigate to="/" replace /> : null; 
};

export default ProtectedRoute;
