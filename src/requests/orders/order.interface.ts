import { IProduct } from "@/interfaces";

export interface IOrder {
    id: string;
    userId: string;
    status: string;
    total: number;
    products: IProduct[];

}