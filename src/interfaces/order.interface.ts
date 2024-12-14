import { Status } from '@/enums'
import { 
  IUser,
  IOrderProducts } from '@/interfaces'
import { IClient } from '@/requests/clients/client.interface';

export interface IOrder {
    id: string;
    totalPrice: number;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    client: IClient;
    user: IUser;
    orderProducts: IOrderProducts[];
  }
  
  