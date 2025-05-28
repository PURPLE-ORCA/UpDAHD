import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const EditEmployeeModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  newEmployeeName,
  setNewEmployeeName,
  newEmployeeEmail,
  setNewEmployeeEmail,
  newEmployeeClassId,
  setNewEmployeeClassId,
  handleEditEmployee,
}) => {
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Make changes to the employee details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Name
            </Label>
            <Input
              id="edit-name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              className="col-span-3 dark:bg-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-email" className="text-right">
              Email
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={newEmployeeEmail}
              onChange={(e) => setNewEmployeeEmail(e.target.value)}
              className="col-span-3 dark:bg-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-class_id" className="text-right">
              Class ID
            </Label>
            <Input
              id="edit-class_id"
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
            onClick={handleEditEmployee}
            className="bg-black dark:bg-white dark:text-black hover:bg-white hover:text-black text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
