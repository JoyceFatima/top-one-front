import { IOrderProducts, IUser } from '@/interfaces'

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount?: number;
  isActive: boolean;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  orderProducts?: IOrderProducts[];
  user: IUser;
}