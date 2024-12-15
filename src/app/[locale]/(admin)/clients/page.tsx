'use client';

import React, { useEffect, useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, DeleteModal, Pagination } from '@/components';
import { ClientModal } from '@/components/molecules/modals/client-modal';
import { useClientApi } from '@/hooks/use-client-api';
import { toast } from '@/hooks';
import { IClient } from '@/interfaces';

export default function Clients() {
  const { fetchClients, deleteClient } = useClientApi();
  const [clients, setClients] = useState<IClient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const displayedClients = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      toast({
        title: 'Success',
        description: 'Client successfully deleted.',
        variant: 'default',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete client.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchClients().then((data) => setClients(data));
  }, [fetchClients]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Clients" />
        <ClientModal setClients={setClients}>
          <Button className="bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800">
            Add New Client
          </Button>
        </ClientModal>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedClients.length > 0 ? (
              displayedClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4">{client.id}</td>
                  <td className="p-4">{client.name}</td>
                  <td className="p-4">{client.email}</td>
                  <td className="p-4">{client.phone}</td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <ClientModal client={client} setClients={setClients}>
                        <Pencil className="w-4 h-4" />
                      </ClientModal>
                    </button>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <DeleteModal handleDelete={() => handleDeleteClient(client.id!)}>
                        <Trash className="w-4 h-4" />
                      </DeleteModal>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No clients found
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
