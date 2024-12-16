import React, { FC } from 'react';
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

interface DeleteModalProps extends Children {
  handleDelete?: () => void;
}

export const DeleteModal: FC<DeleteModalProps> = ({ children, handleDelete }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            variant="destructive"
            onClick={() => {
              if (handleDelete) {
                handleDelete();
              }
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
