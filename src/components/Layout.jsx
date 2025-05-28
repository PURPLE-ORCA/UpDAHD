import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import { Button } from './ui/button';
import { Icon } from "@iconify/react";
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth(); // Get session from AuthContext

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
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-black p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-black dark:text-white">UpDAHD</div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link to="/dashboard" className="flex items-center text-black dark:text-white hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                <Icon icon="mdi:view-dashboard" className="mr-3 text-xl" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/classes" className="flex items-center text-black dark:text-white hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200">
                <Icon icon="mdi:format-list-bulleted" className="mr-3 text-xl" />
                Classes
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black dark:text-white">{getPageTitle()}</h2>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Icon icon="mdi:logout" className="mr-2" /> Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet /> {/* Render the child route component here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
