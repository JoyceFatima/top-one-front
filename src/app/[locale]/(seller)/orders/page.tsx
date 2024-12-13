"use client"

import React, { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb, Status, DeleteModal, OrderModal, Pagination } from "@/components"
import { Role, Status as StatusEnum } from "@/enums"
import { useAuth } from "@/hooks"
import { useParams } from "next/navigation"
import { customDayJs } from "@/configs"

export default function Orders() {
  const { locale } = useParams()
  const { user } = useAuth()

  const orders = [
    {
      id: "1",
      totalPrice: 150.5,
      status: StatusEnum.PROCESSING,
      createdAt: new Date("2023-12-01"),
      client: { name: "John Doe", email: "john.doe@example.com" },
      productId: "1",
    },
    {
      id: "2",
      totalPrice: 250.0,
      status: StatusEnum.SENT,
      createdAt: new Date("2023-12-02"),
      client: { name: "Jane Smith", email: "jane.smith@example.com" },
      productId: "1",
    },
    {
      id: "3",
      totalPrice: 99.99,
      status: StatusEnum.DELIVERED,
      createdAt: new Date("2023-12-03"),
      client: { name: "Alice Johnson", email: "alice.johnson@example.com" },
      productId: "1",
    },
  ]

     const itemsPerPage = 10;
      const [currentPage, setCurrentPage] = useState(1);
    
      const totalPages = Math.ceil(orders.length / itemsPerPage);
      const displayedOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Orders" />
        {user?.role === Role.SELLER && (
          <OrderModal>
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
              {user?.role === Role.SELLER && (
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
                <td className="p-4">{order.client.name}</td>
                <td className="p-4">{order.client.email}</td>
                <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                <td className="p-4">
                  <Status status={order.status as StatusEnum} />
                </td>
                <td className="p-4">{customDayJs(order.createdAt).locale(locale as string).format("LLL")}</td>
                {user?.role === Role.SELLER && (
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <OrderModal order={order}>
                        <Pencil className="w-4 h-4" />
                      </OrderModal>
                    </button>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                      <DeleteModal>
                        <Trash className="w-4 h-4" />
                      </DeleteModal>
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
  )
}
