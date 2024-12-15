import { Role } from '@/enums';

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userRoles: IUserRoles[]
}

interface IUserRoles {
  id: string;
  role: IRole
}

interface IRole {
  id: string
  name: Role
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
