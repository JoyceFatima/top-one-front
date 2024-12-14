'use client';
import { filterMenu } from '@/routes';
import { useAuth, useSidebar } from '@/hooks';
import { Link } from '@/i18n/routing';

export const Sidebar = () => {
  const { user } = useAuth();
  const { isExpanded } = useSidebar();

  return (
    <div
      className={`h-screen bg-slate-100 dark:bg-gray-800 shadow-md flex flex-col transition-transform duration-300 ${
        isExpanded ? 'w-64' : 'fit-content'
      }`}
    >
      <nav className="flex-grow mt-4 px-2">
        <ul className="space-y-2">
          {filterMenu(user?.userRoles.map((userRole) => userRole.role.name)).map(({ icon: Icon, link, title }) => {
            return (
              <li key={title} className="h-14">
                <Link
                  href={link}
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
