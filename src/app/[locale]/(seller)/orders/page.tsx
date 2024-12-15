'use client';

import React, { useEffect, useState } from 'react';
import { Truck, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  Status,
  DeleteModal,
  OrderModal,
  Pagination,
} from '@/components';
import { Role, Status as StatusEnum } from '@/enums';
import { toast, useAuth, useClientApi, useProductApi } from '@/hooks';
import { useParams } from 'next/navigation';
import { customDayJs } from '@/configs';
import { useOrderApi } from '@/hooks/use-order-api';
import { IClient, IOrder, IProduct } from '@/interfaces';
import { StatusModal } from '@/components/molecules/modals/status-modal';

export default function Orders() {
  const { locale } = useParams();

  const { user } = useAuth();
  const { fetchOrders, deleteOrder, updateStatus } = useOrderApi();
  const { getAll } = useProductApi();
  const { fetchClients } = useClientApi();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const displayedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast({
        title: 'Success',
        description: 'Order successfully deleted.',
        variant: 'default',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete Order.',
        variant: 'destructive',
      });
    }
  };

  const getData = async () => {
    fetchOrders(user?.id ?? '').then((data) => setOrders(data));
    getAll().then((data) => setProducts(data));
    fetchClients().then((data) => setClients(data));
  }

  useEffect(() => {
    getData();
  }, [fetchOrders, user]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Orders" />
        {user?.userRoles[0]?.role.name === Role.SELLER && (
          <OrderModal clients={clients} products={products} user={user} fetchOrders={getData}>
            <Button className="bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800 shadow-md">
              Add New Order
            </Button>
          </OrderModal>
        )}
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Total Price</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Created At</th>
              {user?.userRoles[0]?.role.name === Role.SELLER && (
                <th className="text-left p-4">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order?.client?.name ?? ''}</td>
                <td className="p-4">{order?.client?.email ?? ''}</td>
                <td className="p-4">{order.totalPrice}</td>
                <td className="p-4">
                  <Status status={order.status as StatusEnum} />
                </td>
                <td className="p-4">
                  {customDayJs(order.createdAt)
                    .locale(locale as string)
                    .format('LLL')}
                </td>
                {user?.userRoles[0]?.role.name === Role.SELLER && (
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <OrderModal order={order} clients={clients} products={products} user={user} fetchOrders={getData}>
                        <Pencil className="w-4 h-4" />
                      </OrderModal>
                    </button>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <DeleteModal handleDelete={() => handleDeleteOrder(order.id)}>
                        <Trash className="w-4 h-4" />
                      </DeleteModal>
                    </button>
                    <button className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                      <StatusModal handleStatus={updateStatus} fetchOrders={getData} order={order}>
                        <Truck className="w-4 h-4" />
                      </StatusModal>
                    </button>
                  </td>
                )}
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
