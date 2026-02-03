// src/components/dashboard/Notifications.jsx
import React from "react";
import { FiBell } from "react-icons/fi";

export default function Notifications({ notifications = [] }) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <FiBell className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <span className="ml-auto text-sm text-gray-500">
          {notifications.length}
        </span>
      </div>

      {/* Body */}
      {notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No notifications available
        </div>
      ) : (
        <ul className="divide-y">
          {notifications.map((n, i) => (
            <li key={i} className="px-4 py-3 hover:bg-gray-50 transition">
              <p className="font-medium text-gray-800">{n.title}</p>
              <p className="text-sm text-gray-600">{n.message}</p>

              {n.time && <p className="text-xs text-gray-400 mt-1">{n.time}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
