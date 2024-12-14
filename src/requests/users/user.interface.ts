export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string; 
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; 
  userRoles: IUserRole[]; 
}

export interface IUserRole {
  id: string;
  user: IUser;
  role: IRole; 
}

export interface IRole {
  id: string;
  name: ERole; 
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export enum ERole {
  ADMIN = 'admin',
  SELLER = 'seller',
}