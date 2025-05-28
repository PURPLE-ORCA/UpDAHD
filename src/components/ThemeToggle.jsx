import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Icon } from "@iconify/react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="dark:text-white dark:border-white hover:bg-black"
    >
      {theme === 'light' ? (
        <Icon icon="mdi:weather-sunny" className="h-5 w-5" />
      ) : (
        <Icon icon="mdi:weather-night" className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
