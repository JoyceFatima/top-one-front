"use client"
import React, { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb, DeleteModal, Pagination } from "@/components"
import { AddClientModal } from "@/components/molecules/modals/client-modal"

export default function Clients() {
  const clients = [
    { id: 1, name: "Michael Brown", email: "michael.brown@example.com" },
    { id: 2, name: "Laura Wilson", email: "laura.wilson@example.com" },
    { id: 3, name: "David Johnson", email: "david.johnson@example.com" },
    { id: 4, name: "Emma Davis", email: "emma.davis@example.com" },
    { id: 5, name: "James Smith", email: "james.smith@example.com" },
    { id: 6, name: "Olivia Taylor", email: "olivia.taylor@example.com" },
    { id: 7, name: "Noah Anderson", email: "noah.anderson@example.com" },
    { id: 8, name: "Sophia Moore", email: "sophia.moore@example.com" },
    { id: 9, name: "Liam Thomas", email: "liam.thomas@example.com" },
    {
      id: 10,
      name: "Isabella Martinez",
      email: "isabella.martinez@example.com",
    },
    { id: 11, name: "Ethan White", email: "ethan.white@example.com" },
    { id: 12, name: "Mia Harris", email: "mia.harris@example.com" },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(clients.length / itemsPerPage)
  const displayedClients = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb title="Clients" />
        <AddClientModal>
          <Button className="bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800">
            Add New Client
          </Button>
        </AddClientModal>
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
            {displayedClients.map((client) => (
              <tr
                key={client.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">{client.id}</td>
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.email}</td>
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
  )
}
