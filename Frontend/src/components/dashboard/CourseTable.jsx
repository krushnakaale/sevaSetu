// src/components/dashboard/CoursesTable.jsx
import React, { useMemo } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function CoursesTable({
  courses = [],
  search = "",
  onEdit,
  onDelete,
}) {
  const filteredCourses = useMemo(() => {
    return courses.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [courses, search]);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Course Name</th>
            <th className="px-4 py-2 text-left">Enrolled</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCourses.map((course) => (
            <tr
              key={course._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 font-medium">{course.name}</td>

              <td className="px-4 py-2">{course.enrolled}</td>

              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    course.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {course.status || "Draft"}
                </span>
              </td>

              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEdit?.(course)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  <FiEdit2 />
                  Edit
                </button>

                <button
                  onClick={() => onDelete?.(course._id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredCourses.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-gray-400">
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
