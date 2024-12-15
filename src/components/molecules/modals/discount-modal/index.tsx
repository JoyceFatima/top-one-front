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

type Props = Children & {
  product: IProduct;
  setProducts: (products: IProduct[]) => void;
};

export const DiscountModal: FC<Props> = ({ children, product, setProducts }) => {
  const { discountProduct, getAll } = useProductApi();
  const [open, setOpen] = useState(false);
  const [discount, setDiscount] = useState<number>(product.discount ?? 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (discount < 0 || discount > 100) {
      toast({
        title: 'Validation Error',
        description: 'Discount must be between 0 and 100.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (product.id) {
        await discountProduct(product.id, { ...product, discount });
        const updatedProducts = await getAll();
        setProducts(updatedProducts);
  
        toast({
          title: 'Success',
          description: 'Discount applied successfully.',
        });
        handleClose();
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while applying the discount.',
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={handleOpen}>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Discount</DialogTitle>
          <DialogDescription>
            Set the discount percentage for the product: {product.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount (%)
              </label>
              <Input
                id="discount"
                type="number"
                placeholder="0"
                value={discount}
                onChange={handleDiscountChange}
                required
                min={0}
                max={100}
              />
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
              {isSubmitting ? 'Applying...' : 'Apply Discount'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
