'use client';

import React, { useEffect, useState } from 'react';
import { Breadcrumb, Pagination, Status } from '@/components';
import { IRole } from '@/interfaces/role.interface';
import { useRolesApi } from '@/hooks/use-role';

export default function Roles() {
  const { fetchRoles } = useRolesApi();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(roles.length / itemsPerPage);
  const displayedRoles = roles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchRoles().then((data) => setRoles(data));
  }, [fetchRoles]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Roles" />
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Active</th>
            </tr>
          </thead>
          <tbody>
            {displayedRoles.length > 0 ? (
              displayedRoles.map((client) => (
                <tr
                  key={client.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4">{client.id}</td>
                  <td className="p-4">{client.name}</td>
                  <td className="p-4">{client.description}</td>
                  <td className="p-4">
                    <Status status={client.isActive ? 'active' : 'inactive'} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No roles found
                </td>
              </tr>
            )}
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
