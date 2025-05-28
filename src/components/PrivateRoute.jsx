import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <p className="font-fira-code">Loading...</p>
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
