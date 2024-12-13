'use client';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NotFoundPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => setIsLoading(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
        <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mt-2">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            onClick={handleLoading}
            style={{
              pointerEvents: isLoading ? 'none' : 'auto',
              opacity: isLoading ? 0.5 : 1,
            }}
            className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
