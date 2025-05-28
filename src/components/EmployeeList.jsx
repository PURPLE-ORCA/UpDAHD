import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Icon } from "@iconify/react"; // Assuming Icon is used here

const EmployeeList = ({ employees, openEditModal, confirmDeleteEmployee }) => {
  const getClassBadgeColor = (classId) => {
    switch (classId) {
      case 1: return 'bg-blue-500 text-white'; // blue
      case 2: return 'bg-orange-500 text-white'; // orange
      case 3: return 'bg-green-500 text-white'; // green
      case 4: return 'bg-red-500 text-white'; // red
      case 5: return 'bg-yellow-500 text-black'; // yellow
      case 6: return 'bg-amber-400 text-black'; // gold (using amber for gold-like color)
      default: return 'bg-gray-500 text-white'; // default color for other classes
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      {employees.map((employee) => (
        <Card
          key={employee.id}
          className="dark:bg-black dark:text-white shadow-ls dark:shadow-white hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle>{employee.name}</CardTitle>
            <CardDescription>{employee.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getClassBadgeColor(
                employee.current_class_id
              )}`}
            >
              {employee.classes
                ? employee.classes.name
                : `Class ID: ${employee.current_class_id}`}
            </span>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Link to={`/employee/${employee.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="dark:text-white dark:border-white hover:bg-black/50"
              >
                View
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEditModal(employee)}
              className="dark:text-white dark:border-white hover:bg-black/50"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => confirmDeleteEmployee(employee.id)}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EmployeeList;
