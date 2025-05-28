import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom'; // Keep Link for employee detail navigation

const Dashboard = () => {
  // Removed useNavigate as navigation is handled by Layout
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeeClassId, setNewEmployeeClassId] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const confirmDeleteEmployee = (id) => {
    setEmployeeToDeleteId(id);
    setIsDeleteConfirmModalOpen(true);
  };

  const executeDeleteEmployee = async () => {
    if (!employeeToDeleteId) return;

    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', employeeToDeleteId);

    if (error) {
      console.error('Error deleting employee:', error);
      setError(error.message);
    } else {
      setEmployees(employees.filter(emp => emp.id !== employeeToDeleteId));
      setIsDeleteConfirmModalOpen(false);
      setEmployeeToDeleteId(null);
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('employees')
      .select('*, classes(name)'); // Select all from employees and the name from the related classes table

    if (error) {
      setError(error.message);
      console.error('Error fetching employees:', error);
    } else {
      setEmployees(data);
    }
    setLoading(false);
  };

  // Removed handleLogout as it's now in Layout

  const handleAddEmployee = async () => {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error getting user session:', userError);
      setError(userError.message);
      return;
    }
    console.log('Current authenticated user:', user);

    const { data, error: insertError } = await supabase
      .from('employees')
      .insert([
        { name: newEmployeeName, email: newEmployeeEmail, current_class_id: newEmployeeClassId }
      ])
      .select();

    if (insertError) {
      console.error('Error adding employee:', insertError);
      setError(insertError.message);
    } else {
      setEmployees([...employees, ...data]);
      setNewEmployeeName('');
      setNewEmployeeEmail('');
      setNewEmployeeClassId(1);
      setIsAddModalOpen(false);
    }
  };

  const handleEditEmployee = async () => {
    if (!currentEmployee) return;

    const { data, error } = await supabase
      .from('employees')
      .update({ name: newEmployeeName, email: newEmployeeEmail, current_class_id: newEmployeeClassId })
      .eq('id', currentEmployee.id)
      .select();

    if (error) {
      console.error('Error updating employee:', error);
      setError(error.message);
    } else {
      setEmployees(employees.map(emp => emp.id === currentEmployee.id ? data[0] : emp));
      setIsEditModalOpen(false);
      setCurrentEmployee(null);
      setNewEmployeeName('');
      setNewEmployeeEmail('');
      setNewEmployeeClassId(1);
    }
  };

  const handleDeleteEmployee = async (id) => {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting employee:', error);
      setError(error.message);
    } else {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setNewEmployeeName(employee.name);
    setNewEmployeeEmail(employee.email);
    setNewEmployeeClassId(employee.current_class_id);
    setIsEditModalOpen(true);
  };

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
    <div className="p-4"> {/* Removed min-h-screen, bg-white, dark:bg-black, font-fira-code as handled by Layout */}
      <div className="w-full max-w-6xl flex justify-end items-center mb-8"> {/* Adjusted for Add Employee button only */}
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
      </div>

      {loading && (
        <p className="text-black dark:text-white">Loading employees...</p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className="dark:bg-black dark:text-white shadow-lg dark:shadow-white hover:shadow-xl transition-shadow duration-300"
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
                {employee.classes ? employee.classes.name : `Class ID: ${employee.current_class_id}`}
              </span>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Link to={`/employee/${employee.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:text-white dark:border-white hover:bg-black"
                >
                  View
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditModal(employee)}
                className="dark:text-white dark:border-white hover:bg-black"
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

      {/* Edit Employee Modal */}
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

      {/* Delete Confirmation Modal */}
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
            <Button variant="destructive" onClick={executeDeleteEmployee}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
