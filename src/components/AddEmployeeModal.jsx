import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Icon } from "@iconify/react";

const AddEmployeeModal = ({
  isAddModalOpen,
  setIsAddModalOpen,
  newEmployeeName,
  setNewEmployeeName,
  newEmployeeEmail,
  setNewEmployeeEmail,
  newEmployeeClassId,
  setNewEmployeeClassId,
  handleAddEmployee,
}) => {
  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white dark:bg-white dark:text-black">
          <span className="iconify mr-2" data-icon="mdi:plus"></span> Add
          Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Fill in the details for the new employee.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              className="col-span-3 dark:bg-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={newEmployeeEmail}
              onChange={(e) => setNewEmployeeEmail(e.target.value)}
              className="col-span-3 dark:bg-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class_id" className="text-right">
              Class ID
            </Label>
            <Input
              id="class_id"
              type="number"
              value={newEmployeeClassId}
              onChange={(e) =>
                setNewEmployeeClassId(parseInt(e.target.value))
              }
              className="col-span-3 dark:bg-black dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddEmployee}
            className="bg-black hover:bg-black text-white"
          >
            Add Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
