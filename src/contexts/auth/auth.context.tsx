'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AuthRequests } from '@/requests';
import { IUser } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { defineUser } from '@/mocks';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: IUser | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const login = async (
    email: string,
    // password: string
  ) => {
    try {
      setLoading(true);
      // const response = await AuthRequests.login({ email, password })
      // setUser(response)
      const userMock = defineUser(email);

      if (!userMock) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Email or Password is incorrect',
        });
        return;
      }

      setUser(userMock);
      push('/');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  const getToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const res = await AuthRequests.getUser(token);
    setUser(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
