'use client';

import React, { createContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isMobile: boolean;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(
        savedTheme === 'dark' ? 'dark' : 'light',
      );
    } else {
      document.documentElement.classList.add('light');
    }

    const updateMobileStatus = () => setIsMobile(window.innerWidth <= 768);
    updateMobileStatus();
    window.addEventListener('resize', updateMobileStatus);

    return () => {
      window.removeEventListener('resize', updateMobileStatus);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === 'dark' ? 'light' : 'dark',
    );
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};
