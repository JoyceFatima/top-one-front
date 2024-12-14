import {IOrder} from '@/interfaces'

export interface IOrderProducts {
    id: string;
    quantity: number;
    product: Product;
    order: IOrder;
}