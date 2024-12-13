"use client"
import React, { FC, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Children } from "@/types"
import { Status } from "@/enums"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { capitalize } from "@/funcs"
import { mockProducts } from "@/mocks"

interface IOrder {
  id: string
  totalPrice: number
  status: Status
  createdAt: Date
  client: { name: string; email: string }
  productId: string
}

type Props = Children & {
  order?: IOrder
}

export const OrderModal: FC<Props> = ({ children, order }) => {
  const [formData, setFormData] = useState({
    clientName: order?.client.name || "",
    totalPrice: order?.totalPrice || 0,
    productId: order?.productId || "",
    status: order?.status || Status.PROCESSING,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value as Status }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form data submitted:", formData)
  }

  const modalTitle = order ? "Edit Order" : "Add New Order"
  const modalDescription = order
    ? "Edit the details below to update the order."
    : "Fill in the details below to add a new order."
  const actionButtonLabel = order ? "Save Changes" : "Add Order"

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="clientName"
                className="block text-sm font-medium text-gray-700"
              >
                Client
              </label>
              <Input
                id="clientName"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={handleInputChange}
                required
                disabled={!!order}
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Product
              </label>
              <Select
                onValueChange={handleStatusChange}
                value={formData.productId}
              >
                <SelectTrigger
                  className="rounded-lg sm:ml-auto bg-white dark:bg-slate-600 shadow-none"
                  aria-label="Select the status"
                >
                  <SelectValue placeholder={formData.productId} />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="totalPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Total Price
              </label>
              <Input
                id="totalPrice"
                type="number"
                placeholder="0.00"
                value={formData.totalPrice}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                disabled
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <Select
                onValueChange={handleStatusChange}
                value={formData.status}
              >
                <SelectTrigger
                  className="rounded-lg sm:ml-auto bg-white dark:bg-slate-600 shadow-none"
                  aria-label="Select the status"
                >
                  <SelectValue placeholder={capitalize(formData.status)} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Status).map((status) => (
                    <SelectItem key={status} value={status}>
                      {capitalize(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button type="submit">{actionButtonLabel}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
