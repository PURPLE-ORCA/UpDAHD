import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeDetail from './components/EmployeeDetail';
import ClassList from './components/ClassList';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { useAuth } from './context/AuthContext';

function App() {
  const { loading } = useAuth(); // Only need loading here, PrivateRoute handles session check

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <p className="font-fira-code">Loading authentication...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes wrapped by PrivateRoute and Layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            <Route path="/classes" element={<ClassList />} />
          </Route>
        </Route>

        {/* Redirect any unmatched routes to dashboard if authenticated, or login if not */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
