import React, { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import Sidebar from './Sidebar'; // Import Sidebar
import Header from './Header';   // Import Header

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth(); // Get session from AuthContext

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Employee Dashboard';
      case '/classes':
        return 'Formation Classes';
      case '/employee/:id': // This won't work directly for dynamic routes, will need a more robust solution if needed
        return 'Employee Details';
      default:
        return 'UpDAHD';
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Only render layout if session exists (user is logged in)
  if (!session) {
    return <div>{children}</div>; // Render children directly if not logged in (e.g., Login/Register pages)
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-black font-fira-code">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header getPageTitle={getPageTitle} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet /> {/* Render the child route component here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
