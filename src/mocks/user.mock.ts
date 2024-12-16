import { Role } from '@/enums';
import { IUser } from '@/interfaces';

export const seller: IUser = {
  id: '1',
  username: 'John Doe',
  email: 'seller@example.com',
  password: 'password',
  userRoles: [
    {
      id: '1',
      role: {
        id: '1',
        name: Role.SELLER,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const admin: IUser = {
  id: '1',
  username: 'John Doe',
  email: 'admin@example.com',
  password: 'password',
  userRoles: [
    {
      id: '1',
      role: {
        id: '1',
        name: Role.ADMIN,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defineUser = (email: string): IUser | undefined => {
  switch (email) {
    case seller.email: {
      localStorage.setItem('token', email);
      return seller;
    }
    case admin.email: {
      localStorage.setItem('token', email);
      return admin;
    }
    default: {
      return;
    }
  }
};
