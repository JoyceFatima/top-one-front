'use client';
import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Children } from '@/types';
import { Status } from '@/enums';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IClient, IOrder, IProduct, IUser } from '@/interfaces';
import { Checkbox } from '@/components/ui/checkbox';
import { Image } from 'lucide-react';
import { useOrderApi } from '@/hooks/use-order-api';
import { toast } from '@/hooks';
import { ICreateOrder } from '@/requests/orders/order.interface';

type Props = Children & {
  order?: IOrder;
  user: IUser;
  clients: IClient[];
  products: IProduct[];
  fetchOrders: () => void;
};

export const OrderModal: FC<Props> = ({
  children,
  order,
  user,
  clients,
  products,
  fetchOrders,
}) => {
  const { createOrder, updateOrder } = useOrderApi();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [formData, setFormData] = useState<IOrder>({
    id: order?.id || '',
    totalPrice: order?.totalPrice || 0,
    client: order?.client || undefined,
    user: user,
    status: order?.status || Status.PROCESSING,
    createdAt: order?.createdAt || new Date(),
    updatedAt: order?.updatedAt || new Date(),
  });

  const [selectedProducts, setSelectedProducts] = useState<
    { id?: string; quantity?: number }[]
  >(
    order?.orderProducts?.map(({ product, quantity }) => ({
      id: product.id,
      quantity,
    })) || [],
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client) {
      return;
    }
    if (selectedProducts.length === 0) {
      return;
    }
    setIsSubmitting(true);
    try {
      const sendData: ICreateOrder = {
        clientId: formData.client.id!,
        shoppingCarts: [],
        products: selectedProducts.map(({ id, quantity }) => ({
          id: id!,
          quantity: quantity!,
        })),
      };

      if (order) {
        await updateOrder(order.id!, sendData);
        toast({
          title: 'Success',
          description: 'Order successfully updated.',
          variant: 'default',
        });
      } else {
        await createOrder(sendData);

        toast({
          title: 'Success',
          description: 'Order successfully created.',
          variant: 'default',
        });
      }
      await fetchOrders();
      setOpen(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create Order.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalTitle = order ? 'Edit Order' : 'Add New Order';
  const modalDescription = order
    ? 'Edit the details below to update the order.'
    : 'Fill in the details below to add a new order.';
  const actionButtonLabel = order ? 'Save Changes' : 'Add Order';

  useEffect(() => {
    const totalPrice = selectedProducts.reduce((total, { id, quantity }) => {
      const product = products.find((p) => p.id === id);
      return total + (product?.price || 0) * (quantity ?? 0);
    }, 0);
    setFormData((prev) => ({ ...prev, totalPrice }));
  }, [selectedProducts, products]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100 font-semibold"
              >
                Client
              </label>
              <Select
                disabled={isSubmitting || !!order}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    client: clients.find((client) => client.id === value),
                  }));
                }}
                value={formData?.client?.id || ''}
              >
                <SelectTrigger
                  className="rounded-lg bg-gray-100 dark:bg-gray-700 shadow-none"
                  aria-label="Select the status"
                >
                  <SelectValue placeholder={formData?.client?.name} />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem
                      key={client.id}
                      value={client.id!}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100 font-semibold"
              >
                Products
              </label>
              <div className="space-y-2">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={product.id}
                      checked={selectedProducts.some(
                        (p) => p.id === product.id,
                      )}
                      onCheckedChange={(checked) => {
                        setSelectedProducts((prev) =>
                          checked
                            ? [...prev, { id: product.id, quantity: 1 }]
                            : prev.filter((p) => p.id !== product.id),
                        );
                      }}
                    />
                    {product.imageUrl ? (
                      <div
                        className="min-w-24 min-h-24 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${product.imageUrl})`,
                        }}
                      />
                    ) : (
                      <Image className="min-w-24 min-h-24 rounded-lg text-gray-500 dark:text-gray-400" />
                    )}
                    <div>
                      <label
                        htmlFor={product.id}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100 font-semibold"
                      >
                        {product.name}
                      </label>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {product.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Price: ${product.price}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Discount:{' '}
                          {(product.discount ?? 0)
                            .toString()
                            .padEnd(2)
                            .toString()
                            .replace('.00', '')}
                          %
                        </p>
                      </div>
                      <p>
                        Final Price: $
                        {(
                          product.price -
                          product.price * ((product.discount ?? 1) / 100)
                        ).toFixed(2)}
                      </p>
                      <Input
                        id={product.id}
                        type="number"
                        placeholder="0"
                        value={
                          selectedProducts.find((p) => p.id === product.id)
                            ?.quantity || 0
                        }
                        onChange={(e) => {
                          const { value } = e.target;
                          setSelectedProducts((prev) =>
                            prev.map((p) =>
                              p.id === product.id
                                ? { ...p, quantity: +value }
                                : p,
                            ),
                          );
                        }}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="totalPrice"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100"
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
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                type="button"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={isSubmitting}
                onClick={handleOpen}
              >
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              type="submit"
              className="bg-blue-600 dark:bg-blue-800 text-white"
              disabled={
                isSubmitting ||
                !formData.client ||
                selectedProducts.length === 0
              }
            >
              {isSubmitting ? 'Is submitting' : actionButtonLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
