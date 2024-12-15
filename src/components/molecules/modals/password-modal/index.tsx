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
import { Button } from '@/components/ui/button';
import { Children } from '@/types';
import { Input } from '@/components/ui/input';
import { IUser } from '@/interfaces';
import { toast, useUserApi } from '@/hooks';

interface PasswordModalProps extends Children {
  user: IUser;
}

export const PasswordModal: FC<PasswordModalProps> = ({ user, children }) => {
  const { updateUserPassword } = useUserApi();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateUserPassword(
        user.id!,
        formData.password,
        formData.newPassword,
      );
      toast({
        title: 'Success',
        description: 'User password updated successfully.',
        variant: 'default',
      });
      setOpen(false);
      handleClose();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update user password.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
          <DialogDescription>
            You are updating the password for the user.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
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
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="********"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
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
              {isSubmitting ? 'Submitting...' : 'Update password'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
