import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
const DeleteConfirmationModal = ({
  isDeleteConfirmModalOpen,
  setIsDeleteConfirmModalOpen,
  executeDeleteEmployee,
}) => {

  return (
    <Dialog
      open={isDeleteConfirmModalOpen}
      onOpenChange={setIsDeleteConfirmModalOpen}
    >
      <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this employee? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteConfirmModalOpen(false)}
            className="dark:text-white dark:border-white hover:bg-black"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={executeDeleteEmployee}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
