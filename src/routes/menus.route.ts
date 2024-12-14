import { Role } from '@/enums';
import { Boxes, Home, Users, Package, User } from 'lucide-react';

export const menus = [
  {
    icon: Home,
    title: 'Home',
    link: '/',
    accessBy: [],
  },
  {
    icon: User,
    title: 'Users',
    link: '/users',
    accessBy: [Role.ADMIN],
  },
  {
    icon: Package,
    title: 'Products',
    link: '/products',
    accessBy: [Role.ADMIN],
  },
  {
    icon: Users,
    title: 'Clients',
    link: '/clients',
    accessBy: [Role.ADMIN],
  },
  {
    icon: Boxes,
    title: 'Orders',
    link: '/orders',
    accessBy: [Role.SELLER],
  },
];

export const filterMenu = (roles?: Role[]) => {
  if (!roles?.length) return menus.filter(({ accessBy }) => accessBy.length === 0);
  return menus
    .filter(({ accessBy }) => {
      return roles.some((role) => accessBy.includes(role))
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};
