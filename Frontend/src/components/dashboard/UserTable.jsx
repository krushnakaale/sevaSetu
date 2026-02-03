// src/components/dashboard/UsersTable.jsx
import React from "react";
import { FiTrash2, FiSlash } from "react-icons/fi";

export default function UsersTable({ users, search, onBan, onDelete }) {
  // Filter users based on name or email
  const filtered = users.filter((u) => {
    const name = (u.name || u.username || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const q = search.toLowerCase();

    return name.includes(q) || email.includes(q);
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Registered On</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr
              key={user._id}
              className={`border-b hover:bg-gray-50 transition duration-150 ${
                user.status === "Banned" ? "bg-red-50" : ""
              }`}
            >
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {new Date(user.registeredAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onBan(user._id)}
                  className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm transition"
                  title={user.status === "Banned" ? "Unban User" : "Ban User"}
                >
                  <FiSlash />
                  {user.status === "Banned" ? "Unban" : "Ban"}
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                  title="Delete User"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-4 text-center text-gray-400">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
