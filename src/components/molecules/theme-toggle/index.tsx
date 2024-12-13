'use client';
import { useTheme } from '@/hooks';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-100 dark:bg-gray-800 text-black dark:text-white transition-colors mr-2 hover:bg-slate-200 dark:hover:bg-gray-700 shadow-none border-none"
      aria-label="Toggle Theme"
    >
      <Moon className="hidden dark:block w-5 h-5 text-gray-200" />
      <Sun className="block dark:hidden w-5 h-5 text-black" />
    </Button>
  );
};
