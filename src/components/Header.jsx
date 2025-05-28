import React from 'react';
import { Button } from './ui/button';
import { Icon } from "@iconify/react";
import ThemeToggle from './ThemeToggle'; // Import ThemeToggle directly

const Header = ({ getPageTitle, toggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden text-black dark:text-white"
      >
        <Icon icon="mdi:menu" className="text-2xl" />
      </Button>
      <h2 className="text-2xl font-bold text-black dark:text-white">{getPageTitle()}</h2>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
