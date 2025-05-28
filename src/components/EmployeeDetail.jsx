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
  const [progressLogs, setProgressLogs] = useState([]);

  useEffect(() => {
    const fetchEmployeeAndLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch employee details
        const { data: employeeData, error: employeeError } = await supabase
          .from('employees')
          .select('*, classes(name)')
          .eq('id', id)
          .single();

        if (employeeError) {
          throw employeeError;
        }
        setEmployee(employeeData);

        // Fetch progress logs for this employee, including class name and action type
        const { data: logsData, error: logsError } = await supabase
          .from('progress_logs')
          .select('class_id, completed_at, action_type, classes(name)')
          .eq('employee_id', id)
          .order('completed_at', { ascending: false });

        if (logsError) {
          throw logsError;
        }
        setProgressLogs(logsData);

      } catch (err) {
        setError('Failed to fetch details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeAndLogs();
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

      // Log progress entry
      const { error: logError } = await supabase
        .from('progress_logs')
        .insert([
          {
            employee_id: id,
            class_id: newClassId,
            completed_at: new Date().toISOString(), // Current timestamp
            action_type: 'promoted', // Add action type
          },
        ]);

      if (logError) {
        console.error('Failed to log progress:', logError.message);
        setFeedback('Employee promoted, but failed to log progress: ' + logError.message);
        setFeedbackType('error');
      } else {
        setFeedback('Employee promoted successfully!');
        setFeedbackType('success');
      }
      // Re-fetch logs to update the display
      const { data: updatedLogs, error: updatedLogsError } = await supabase
        .from('progress_logs')
        .select('class_id, completed_at, action_type, classes(name)')
        .eq('employee_id', id)
        .order('completed_at', { ascending: false });

      if (updatedLogsError) {
        console.error('Failed to re-fetch logs after promote:', updatedLogsError.message);
      } else {
        setProgressLogs(updatedLogs);
      }

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

      // Log progress entry for downgrade
      const { error: logError } = await supabase
        .from('progress_logs')
        .insert([
          {
            employee_id: id,
            class_id: newClassId,
            completed_at: new Date().toISOString(), // Current timestamp
            action_type: 'downgraded', // Add action type
          },
        ]);

      if (logError) {
        console.error('Failed to log downgrade progress:', logError.message);
        setFeedback('Employee downgraded, but failed to log progress: ' + logError.message);
        setFeedbackType('error');
      } else {
        setFeedback('Employee downgraded successfully!');
        setFeedbackType('success');
      }
      // Re-fetch logs to update the display
      const { data: updatedLogs, error: updatedLogsError } = await supabase
        .from('progress_logs')
        .select('class_id, completed_at, action_type, classes(name)')
        .eq('employee_id', id)
        .order('completed_at', { ascending: false });

      if (updatedLogsError) {
        console.error('Failed to re-fetch logs after downgrade:', updatedLogsError.message);
      } else {
        setProgressLogs(updatedLogs);
      }

    } catch (err) {
      setFeedback('Failed to downgrade employee: ' + err.message);
      setFeedbackType('error');
    }
  };

  if (loading) {
    return <div className="text-center py-4 font-fira-code">Loading employee details...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500 font-fira-code">{error}</div>;
  }

  if (!employee) {
    return <div className="text-center py-4 font-fira-code">Employee not found.</div>;
  }

  return (
    <div className="flex justify-center items-center p-4">
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
            <div className={`p-3 rounded-md text-sm font-fira-code ${feedbackType === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-white' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-white'}`}>
              {feedback}
            </div>
          )}

          {employee.current_class_id < 6 && (
            <Button onClick={handlePromote} className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
              Promote to Next Class
            </Button>
          )}
          {employee.current_class_id > 1 && (
            <Button onClick={handleDowngrade} className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 mt-2">
              Downgrade to Past Class
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Progress Logs Section */}
      <Card className="w-full max-w-md shadow-lg dark:bg-black dark:text-white mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-purple-800 dark:text-white font-fira-code">Progress History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {progressLogs.length > 0 ? (
            progressLogs.map((log, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-2 rounded-md font-fira-code text-sm
                  ${log.action_type === 'promoted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-white' : ''}
                  ${log.action_type === 'downgraded' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-white' : ''}
                  ${!log.action_type ? 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200' : ''}
                `}
              >
                <span>Got {log.action_type} to {log.classes?.name || `Class ID: ${log.class_id}`}</span>
                <span>{new Date(log.completed_at).toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 font-fira-code">No progress logs found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
