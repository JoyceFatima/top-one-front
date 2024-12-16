'use client';
import { Header, Page, Sidebar } from '@/components';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks';
import { Children } from '@/types';
import React from 'react';

export const Layout: React.FC<Children> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen w-full">
      <Header />
      <div className="flex w-full">
        {user && <Sidebar />}
        <Page>{children}</Page>
      </div>
      <Toaster />
    </div>
  );
};
