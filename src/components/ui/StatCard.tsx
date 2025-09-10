import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
