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
import { Button } from '@/components/ui/button';
import { Children } from '@/types';
import { Status } from '@/enums';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IOrder } from '@/interfaces';
import { PackageOpen, ShoppingBasket, Truck } from 'lucide-react';
import { capitalize } from '@/funcs';
import { IUpdateStatus } from '@/requests/orders/order.interface';
import { toast } from '@/hooks';

interface StatusModalProps extends Children {
  handleStatus: (id: string, status: IUpdateStatus) => void;
  fetchOrders: () => void;
  order: IOrder;
}

export const StatusModal: FC<StatusModalProps> = ({
  children,
  order,
  handleStatus,
  fetchOrders,
}) => {
  const [status, setStatus] = useState<Status>(order.status);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  useEffect(() => {
    if (status === Status.PROCESSING) {
      setProgress(10);
    } else if (status === Status.SENT) {
      setProgress(50);
    } else if (status === Status.DELIVERED) {
      setProgress(100);
    }
  }, [status]);

  const changeColor = (status: Status) => {
    if (status === Status.PROCESSING) {
      return 'bg-cyan-500 dark:bg-cyan-400';
    } else if (status === Status.SENT) {
      return 'bg-yellow-500 dark:bg-yellow-400';
    }
    return 'bg-green-500 dark:bg-green-400';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>Update the status of the order.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            setIsSubmitting(true);
            try {
              await handleStatus(order.id, {
                status,
              });
              await fetchOrders();
              setOpen(false);
              toast({
                title: 'Success',
                description:
                  'Status updated successfully. Email sent to client.',
                variant: 'default',
              });
            } catch {
              toast({
                title: 'Error',
                description: 'Failed to update status.',
                variant: 'destructive',
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className="space-y-4">
            <div>
              <div className="w-full flex justify-between text-sm mb-2">
                <ShoppingBasket className="text-blue-500 dark:text-blue-400" />
                <Truck className="text-yellow-500 dark:text-yellow-400" />
                <PackageOpen className="text-green-500 dark:text-green-400" />
              </div>
              <Progress
                value={progress}
                indicatorColor={changeColor(status)}
                className={`w-full`}
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100 font-semibold"
              >
                Client
              </label>
              <Select
                disabled={order.status === Status.DELIVERED}
                onValueChange={(value) => {
                  setStatus(value as Status);
                }}
                value={status}
              >
                <SelectTrigger
                  className="rounded-lg bg-gray-100 dark:bg-gray-700 shadow-none"
                  aria-label="Select the status"
                >
                  <SelectValue placeholder={order.status} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Status).map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      {capitalize(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  disabled={isSubmitting}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogTrigger>
              <Button
                type="submit"
                className="bg-blue-600 dark:bg-blue-800 text-white"
                disabled={isSubmitting || order.status === Status.DELIVERED}
              >
                {isSubmitting ? 'Is submitting' : 'Save Status'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
