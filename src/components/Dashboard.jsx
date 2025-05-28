import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import EmployeeList from './EmployeeList';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Button } from './ui/button'; 
const Dashboard = () => {
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

  return (
    <div className="p-4">
      <div className="w-full max-w-6xl flex justify-end items-center mb-8">
        <AddEmployeeModal
          isAddModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          newEmployeeName={newEmployeeName}
          setNewEmployeeName={setNewEmployeeName}
          newEmployeeEmail={newEmployeeEmail}
          setNewEmployeeEmail={setNewEmployeeEmail}
          newEmployeeClassId={newEmployeeClassId}
          setNewEmployeeClassId={setNewEmployeeClassId}
          handleAddEmployee={handleAddEmployee}
        />
      </div>
      {loading && (
        <p className="text-black dark:text-white">Loading employees...</p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      <EmployeeList
        employees={employees}
        openEditModal={openEditModal}
        confirmDeleteEmployee={confirmDeleteEmployee}
      />
      <EditEmployeeModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        newEmployeeName={newEmployeeName}
        setNewEmployeeName={setNewEmployeeName}
        newEmployeeEmail={newEmployeeEmail}
        setNewEmployeeEmail={setNewEmployeeEmail}
        newEmployeeClassId={newEmployeeClassId}
        setNewEmployeeClassId={setNewEmployeeClassId}
        handleEditEmployee={handleEditEmployee}
      />
      <DeleteConfirmationModal
        isDeleteConfirmModalOpen={isDeleteConfirmModalOpen}
        setIsDeleteConfirmModalOpen={setIsDeleteConfirmModalOpen}
        executeDeleteEmployee={executeDeleteEmployee}
      />
    </div>
  );
};

export default Dashboard;
