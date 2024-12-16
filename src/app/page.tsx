'use client';
import { LoadingSpinner } from '@/components';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {
  const { locale } = useParams();
  const { push } = useRouter();

  useEffect(() => {
    push(`/${locale}/auth/login`);
  }, [locale, push]);

  return <LoadingSpinner />;
}
