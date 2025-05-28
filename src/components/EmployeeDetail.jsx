import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import EmployeeInfoCard from './EmployeeInfoCard';
import EmployeeActions from './EmployeeActions';
import ProgressHistoryCard from './ProgressHistoryCard';

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
    <div className="flex flex-col items-center p-4">
      <EmployeeInfoCard employee={employee} />
      <EmployeeActions
        employee={employee}
        handlePromote={handlePromote}
        handleDowngrade={handleDowngrade}
        feedback={feedback}
        feedbackType={feedbackType}
      />
      <ProgressHistoryCard progressLogs={progressLogs} />
    </div>
  );
};

export default EmployeeDetail;
