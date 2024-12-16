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
import { toast, useUserApi } from '@/hooks';
import { IRole, IUser } from '@/interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = Children & {
  user?: IUser;
  roles: IRole[];
  setUsers: (users: IUser[]) => void;
};

export const UserModal: FC<Props> = ({ children, user, roles, setUsers }) => {
  const { fetchUsers, createUser, updateUser } = useUserApi();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IUser>({
    id: user?.id ?? undefined,
    username: user?.username ?? '',
    email: user?.email ?? '',
    password: user?.password ?? '',
    userRoles: user?.userRoles ?? [],
    createdAt: user?.createdAt ?? new Date(),
    updatedAt: user?.updatedAt ?? new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (user?.id) {
        await updateUser(user.id, formData);
        toast({
          title: 'Success',
          description: 'User updated successfully.',
          variant: 'default',
        });
      } else {
        const sendFormData = {
          ...formData,
          role: formData.userRoles[0].role.name,
        };
        await createUser(sendFormData);
        toast({
          title: 'Success',
          description: 'User added successfully.',
          variant: 'default',
        });
      }

      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while saving the user.',
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

  const modalTitle = user ? 'Edit User' : 'Add New User';
  const modalDescription = user
    ? 'Edit the details below to update the user.'
    : 'Fill in the details below to add a new user.';
  const actionButtonLabel = user ? 'Save Changes' : 'Add User';

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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="username"
                placeholder="John Doe"
                value={formData.username}
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
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                required={!user}
                disabled={!!user}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Roles
              </label>
              <Select
                onValueChange={(value) => {
                  const role = roles.find((r) => r.name === value);
                  setFormData((prev) => ({
                    ...prev,
                    userRoles: [
                      {
                        id: prev?.userRoles?.[0]?.id ?? undefined,
                        role: role!,
                      },
                    ],
                  }));
                }}
                value={formData?.userRoles?.[0]?.role?.name ?? ''}
              >
                <SelectTrigger
                  className="rounded-lg sm:ml-auto bg-white dark:bg-slate-600 shadow-none"
                  aria-label="Select the status"
                >
                  <SelectValue placeholder={formData?.userRoles?.[0]?.id} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : actionButtonLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
