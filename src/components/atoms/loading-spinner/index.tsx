import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Redirecting... Please wait.
        </p>
      </div>
    </div>
  );
};

