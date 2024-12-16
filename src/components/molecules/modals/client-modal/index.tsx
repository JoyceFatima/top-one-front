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
import { Children } from '@/types';
import { toast, useClientApi } from '@/hooks';
import { IClient } from '@/interfaces/client.interface';

type Props = Children & {
  client?: IClient;
  setClients: (clients: IClient[]) => void;
};

export const ClientModal: FC<Props> = ({ children, client, setClients }) => {
  const { fetchClients, createClient, updateClient } = useClientApi();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IClient>({
    id: client?.id ?? undefined,
    name: client?.name ?? '',
    email: client?.email ?? '',
    phone: client?.phone ?? '',
    createdAt: client?.createdAt ?? new Date(),
    updatedAt: client?.updatedAt ?? new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (client?.id) {
        await updateClient(client.id, formData);
        toast({
          title: 'Success',
          description: 'Client updated successfully.',
        });
      } else {
        await createClient(formData);
        toast({
          title: 'Success',
          description: 'Client added successfully.',
          variant: 'default',
        });
      }

      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error('Error saving client:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while saving the client.',
        variant: 'destructive',
      });
    } finally {
      handleClose(); 
      setIsSubmitting(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalTitle = client ? 'Edit Client' : 'Add New Client';
  const modalDescription = client
    ? 'Edit the details below to update the client.'
    : 'Fill in the details below to add a new client.';
  const actionButtonLabel = client ? 'Save Changes' : 'Add Client';

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
                placeholder="Michael Brown"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="michael.brown@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <Input
                id="phone"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline" disabled={isSubmitting} onClick={handleClose}>
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
