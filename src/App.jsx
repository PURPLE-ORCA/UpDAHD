import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EmployeeDetail from './components/EmployeeDetail';
import ClassList from './components/ClassList';
import Layout from './components/Layout'; // Import the new Layout component
import { useAuth } from './context/AuthContext';

function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black font-fira-code">
        Loading authentication...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes wrapped by Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="/classes" element={<ClassList />} />
        </Route>

        {/* Redirect to login if no session and trying to access protected routes */}
        {!session && <Route path="*" element={<Navigate to="/login" replace />} />}
        {/* Redirect to dashboard if session exists and trying to access non-existent route */}
        {session && <Route path="*" element={<Navigate to="/dashboard" replace />} />}
      </Routes>
    </Router>
  );
}

export default App;
