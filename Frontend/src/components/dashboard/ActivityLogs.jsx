// src/components/dashboard/ActivityLogs.jsx
import React from "react";

export default function ActivityLogs({ logs = [] }) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Activity Logs</h2>
        <span className="text-sm text-gray-500">Total: {logs.length}</span>
      </div>

      {logs.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No activity logs available
        </div>
      ) : (
        <ul className="divide-y">
          {logs.map((log, i) => (
            <li
              key={i}
              className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{log.user}</p>
                <p className="text-sm text-gray-600">{log.action}</p>
              </div>

              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                {log.time}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
