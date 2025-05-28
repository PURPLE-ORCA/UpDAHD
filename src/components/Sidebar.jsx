import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Icon } from "@iconify/react";

const Sidebar = ({ isSidebarOpen, toggleSidebar, handleLogout }) => {
  return (
    <>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-black p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-black dark:text-white">UpDAHD</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden text-black dark:text-white"
          >
            <Icon icon="mdi:close" className="text-2xl" />
          </Button>
        </div>
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
        <div className="mt-auto"> {/* This div will push the button to the bottom */}
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Icon icon="mdi:logout" className="mr-2" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
