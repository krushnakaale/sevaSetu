// src/components/dashboard/StatsCards.jsx
import React from "react";

export default function StatsCard({
  title,
  value,
  color = "yellow",
  icon: Icon,
  subtitle,
}) {
  const colors = {
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      icon: "bg-yellow-100 text-yellow-600",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      icon: "bg-green-100 text-green-600",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: "bg-blue-100 text-blue-600",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      icon: "bg-red-100 text-red-600",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`rounded-xl shadow-sm border bg-white p-5 hover:shadow-md transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${theme.text}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg ${theme.icon}`}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
