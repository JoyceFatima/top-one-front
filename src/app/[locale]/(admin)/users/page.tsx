'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { LockKeyhole, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, DeleteModal, Pagination, PasswordModal } from '@/components';
import { UserModal } from '@/components/molecules/modals/user-modal';
import { useUserApi } from '@/hooks/use-user-api';
import { customDayJs } from '@/configs';
import { useParams } from 'next/navigation';
import { toast } from '@/hooks';
import { IRole, IUser } from '@/interfaces';
import { useRolesApi } from '@/hooks/use-role';

export default function Users() {
  const { locale } = useParams();
  const { fetchUsers, deleteUser } = useUserApi();
  const { fetchRoles } = useRolesApi();

  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roles, setRoles] = useState<IRole[]>([]);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleGetRoles = useCallback(async () => {
    const data = await fetchRoles();
    setRoles(data);
  }, [fetchRoles]);

  const handleDeleteUsers = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast({
        title: 'Success',
        description: 'Users successfully deleted.',
        variant: 'default',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete Users.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    handleGetRoles();
    fetchUsers().then((data) => setUsers(data));
  }, [fetchUsers, handleGetRoles]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Users" />
        <UserModal setUsers={setUsers} roles={roles}>
          <Button className="bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800">
            Add New User
          </Button>
        </UserModal>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Username</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Created</th>
              <th className="text-left p-4">Updated</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">
                    {user?.userRoles?.[0]?.role.name}
                  </td>
                  <td className="p-4">
                    {customDayJs(user.createdAt)
                      .locale(locale as string)
                      .format('LLL')}
                  </td>
                  <td className="p-4">
                    {customDayJs(user.updatedAt)
                      .locale(locale as string)
                      .format('LLL')}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <UserModal user={user} setUsers={setUsers} roles={roles}>
                        <Pencil className="w-4 h-4" />
                      </UserModal>
                    </button>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <DeleteModal handleDelete={() => handleDeleteUsers(user.id!)}>
                        <Trash className="w-4 h-4" />
                      </DeleteModal>
                    </button>
                    <button className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                      <PasswordModal user={user}>
                        <LockKeyhole className="w-4 h-4" />
                      </PasswordModal>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No users found!
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
