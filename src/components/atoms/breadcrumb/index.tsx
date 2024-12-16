'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  title?: string;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ title }) => {
  const pathname = usePathname();

  const supportedLocales = ['en', 'pt', 'es'];

  const [isLoading, setIsLoading] = React.useState(false);

  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment && !supportedLocales.includes(segment));

  const items = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });

  const handleLoading = () => setIsLoading(true);

  return (
    <div className="mb-4">
      {title && (
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {title}
        </h2>
      )}
      <nav className="text-sm text-gray-600 dark:text-gray-400">
        <ol className="list-reset flex">
          <li className="flex items-center">
            <Link
              href="/"
              onClick={handleLoading}
              style={{
                pointerEvents: isLoading ? 'none' : 'auto',
                opacity: isLoading ? 0.5 : 1,
              }}
              className="text-slate-500 dark:text-slate-400 hover:underline"
            >
              Home
            </Link>
            {items.length > 0 && <span className="mx-2">/</span>}
          </li>

          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <Link
                href={item.href}
                onClick={handleLoading}
                style={{
                  pointerEvents: isLoading ? 'none' : 'auto',
                  opacity: isLoading ? 0.5 : 1,
                }}
                className="text-slate-500 dark:text-slate-400 hover:underline"
              >
                {item.label}
              </Link>
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
