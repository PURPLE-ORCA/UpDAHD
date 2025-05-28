import React from 'react';
import { Button } from './ui/button';
import { CardContent } from './ui/card'; // Only CardContent is needed here

const EmployeeActions = ({ employee, handlePromote, handleDowngrade, feedback, feedbackType }) => {
  return (
    <CardContent className="space-y-4">
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
  );
};

export default EmployeeActions;
