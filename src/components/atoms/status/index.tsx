import React from "react";

interface StatusProps {
  status: "active" | "inactive" | "processing" | "sent" | "delivered";
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",
    processing: "bg-yellow-100 text-yellow-700",
    sent: "bg-blue-100 text-blue-700",
    delivered: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full truncate max-w-32 w-full ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
