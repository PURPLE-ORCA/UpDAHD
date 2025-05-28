import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';

const EmployeeInfoCard = ({ employee }) => {
  return (
    <Card className="w-full max-w-md shadow-lg dark:bg-black dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black0 dark:text-white">Employee Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-black dark:text-white">Name</Label>
          <Input id="name" value={employee.name} readOnly className="mt-1 bg-white dark:bg-black border-black dark:border-white" />
        </div>
        <div>
          <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
          <Input id="email" value={employee.email} readOnly className="mt-1 bg-white dark:bg-black border-black dark:border-white" />
        </div>
        <div>
          <Label htmlFor="classId" className="text-black dark:text-white">Current Class</Label>
          <Input id="classId" value={employee.classes ? employee.classes.name : `ID: ${employee.current_class_id}`} readOnly className="mt-1 bg-white dark:bg-black border-black dark:border-white" />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeInfoCard;
