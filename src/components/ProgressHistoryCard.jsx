import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ProgressHistoryCard = ({ progressLogs }) => {
  return (
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
  );
};

export default ProgressHistoryCard;
