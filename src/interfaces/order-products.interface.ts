import {IOrder, IProduct} from '@/interfaces'

export interface IOrderProducts {
  id: string;
  quantity: number;
  product: IProduct;
  order: IOrder;
}