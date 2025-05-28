import React from 'react';
import { Button } from './ui/button';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-['Fira_Code']">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="text-lg mb-8">You are successfully logged in.</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
