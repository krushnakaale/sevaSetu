// src/components/common/SearchFilter.jsx
import React from "react";
import { FiSearch } from "react-icons/fi"; // Feather search icon

export default function SearchFilter({ search, onSearch, placeholder }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 w-5 h-5" />
      </div>

      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                   transition duration-200 placeholder-gray-400"
      />
    </div>
  );
}
