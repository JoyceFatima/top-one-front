'use client';

import React, { FC, useState } from 'react';
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
import { toast, useProductApi } from '@/hooks';
import { IProduct } from '@/interfaces/product.interface';
import { Children } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = Children & {
  product?: IProduct;
  setProducts: (products: IProduct[]) => void;
};

export const ProductModal: FC<Props> = ({ children, product, setProducts }) => {
  console.log('product', product);
  const { getAll, createProduct, updateProduct } = useProductApi();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IProduct>({
    id: product?.id ?? undefined,
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    isActive: product?.isActive ?? true,
    category: product?.category ?? 'electronics',
    imageUrl: product?.imageUrl ?? '',
    createdAt: product?.createdAt ?? new Date(),
    updatedAt: product?.updatedAt ?? new Date(),
    deletedAt: product?.deletedAt ?? undefined,
    user: {
      id: product?.user.id ?? '',
      username: product?.user.username ?? '',
      email: product?.user.email ?? '',
      userRoles: product?.user.userRoles ?? [],
      createdAt: product?.user.createdAt ?? new Date(),
      updatedAt: product?.user.updatedAt ?? new Date(),
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === 'price' || id === 'stock' || id === 'discount'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      formData.price <= 0 ||
      formData.stock < 0
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (product?.id) {
        await updateProduct(product.id, formData);
        toast({
          title: 'Success',
          description: 'Product updated successfully.',
        });
      } else {
        await createProduct(formData);
        toast({
          title: 'Success',
          description: 'Product added successfully.',
          variant: 'default',
        });
      }

      const data = await getAll();
      setProducts(data);
      handleClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while saving the product.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalTitle = product ? 'Edit Product' : 'Add New Product';
  const modalDescription = product
    ? 'Edit the details below to update the product.'
    : 'Fill in the details below to add a new product.';
  const actionButtonLabel = product ? 'Save Changes' : 'Add Product';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={handleOpen}>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Input
                id="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="home">Home & Kitchen</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="isActive"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <Select
                value={formData.isActive ? 'true' : 'false'}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: value === 'true',
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ativo</SelectItem>
                  <SelectItem value="false">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={isSubmitting}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogTrigger>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : actionButtonLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
