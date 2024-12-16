import { Status } from '@/enums'
import { 
  IUser,
  IOrderProducts, 
  IClient} from '@/interfaces'

export interface IOrder {
  id: string;
  totalPrice: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  client?: IClient;
  user: IUser;
  orderProducts?: IOrderProducts[];
}
  
  