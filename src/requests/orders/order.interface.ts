import { Status } from '@/enums';

export interface ICreateOrder {
  clientId: string;
  products: ICreateOrderProducts[];
  shoppingCarts: any[];
}

interface ICreateOrderProducts {
  id: string;
  quantity: number;
}

export interface IUpdateStatus {
  status: Status;
}
