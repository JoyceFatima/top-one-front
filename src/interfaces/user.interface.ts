import { Role } from '@/enums';

export interface IUser {
  id: string;
  role: Role;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
