import api from '@/configs/api';
import { IOrder } from './order.interface';

export class OrdersRequests {
  async fetchOrders(): Promise<[]> {
    try {
      const response = await api.get('/orders');
      if (!response.data.data) {
        throw new Error('Failed to fetch orders!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await api.delete(`/orders/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
