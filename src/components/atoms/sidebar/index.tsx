'use client';
import { filterMenu } from '@/routes';
import { useAuth, useSidebar } from '@/hooks';
import { Link } from '@/i18n/routing';
import { useState } from 'react';

export const Sidebar = () => {
  const { user } = useAuth();
  const { isExpanded } = useSidebar();

  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = () => setIsLoading(true);

  return (
    <div
      className={`h-screen bg-slate-100 dark:bg-gray-800 shadow-md flex flex-col transition-transform duration-300 ${
        isExpanded ? 'w-64' : 'fit-content'
      }`}
    >
      <nav className="flex-grow mt-4 px-2">
        <ul className="space-y-2">
          {filterMenu(user?.role).map(({ icon: Icon, link, title }) => {
            return (
              <li key={title} className="h-14">
                <Link
                  href={link}
                  onClick={handleLoading}
                  style={{
                    pointerEvents: isLoading ? 'none' : 'auto',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-slate-200 dark:hover:bg-gray-700 rounded"
                >
                  <Icon size={20} className="text-black dark:text-white" />
                  <span
                    className={`transition-opacity ${
                      isExpanded ? 'opacity-100' : 'hidden'
                    } text-black dark:text-white`}
                  >
                    {title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
