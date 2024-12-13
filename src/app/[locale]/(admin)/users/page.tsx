'use client';

import React, { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, DeleteModal, Pagination } from '@/components';
import { AddUserModal } from '@/components/molecules/modals/user-modal';

export default function Users() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Users" />
        <AddUserModal>
          <Button className="bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800">
            Add New User
          </Button>
        </AddUserModal>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 flex space-x-2">
                  <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    <DeleteModal>
                      <Trash className="w-4 h-4" />
                    </DeleteModal>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-self-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
