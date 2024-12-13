'use client';

import { Dashboard, LoadingSpinner, Presentation } from '@/components';
import { useAuth } from '@/hooks';
import React from 'react';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Presentation />;
  }

  return <Dashboard />;
}
