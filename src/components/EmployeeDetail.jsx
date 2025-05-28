import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Removed useNavigate
import { supabase } from '../supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

const EmployeeDetail = () => {
  const { id } = useParams();
  // Removed navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*, classes(name)') // Select class name
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }
        setEmployee(data);
      } catch (err) {
        setError('Failed to fetch employee details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handlePromote = async () => {
    if (!employee) return;

    setFeedback('');
    setFeedbackType('');

    try {
      const newClassId = employee.current_class_id + 1;
      const { data, error } = await supabase
        .from('employees')
        .update({ current_class_id: newClassId })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      setEmployee(data[0]); // Update local state with the new data
      setFeedback('Employee promoted successfully!');
      setFeedbackType('success');
    } catch (err) {
      setFeedback('Failed to promote employee: ' + err.message);
      setFeedbackType('error');
    }
  };

  const handleDowngrade = async () => {
    if (!employee) return;

    setFeedback('');
    setFeedbackType('');

    try {
      const newClassId = Math.max(1, employee.current_class_id - 1); // Ensure class ID doesn't go below 1
      if (newClassId === employee.current_class_id) {
        setFeedback('Employee is already in the lowest class.');
        setFeedbackType('error');
        return;
      }

      const { data, error } = await supabase
        .from('employees')
        .update({ current_class_id: newClassId })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      setEmployee(data[0]); // Update local state with the new data
      setFeedback('Employee downgraded successfully!');
      setFeedbackType('success');
    } catch (err) {
      setFeedback('Failed to downgrade employee: ' + err.message);
      setFeedbackType('error');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading employee details...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div className="text-center py-4">Employee not found.</div>;
  }

  return (
    <div className="flex justify-center items-center p-4"> {/* Removed min-h-screen, bg-white, dark:bg-black, font-fira-code as handled by Layout */}
      <Card className="w-full max-w-md shadow-lg dark:bg-black dark:text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800 dark:text-white">Employee Details</CardTitle>
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

          {feedback && (
            <div className={`p-3 rounded-md text-sm ${feedbackType === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-white' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-white'}`}>
              {feedback}
            </div>
          )}

          <Button onClick={handlePromote} className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
            Promote to Next Class
          </Button>
          <Button onClick={handleDowngrade} className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 mt-2">
            Downgrade to Past Class
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
