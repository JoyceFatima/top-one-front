import api from '@/configs/api';
import { IOrder } from '@/interfaces';
import { ICreateOrder, IUpdateStatus } from './order.interface';
export class OrdersRequests {
  async fetchOrders(userId: string): Promise<IOrder[]> {
    try {
      const response = await api.get('/orders', { params: { userId } });
      if (!response.data.data) {
        throw new Error('Failed to fetch orders!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchOrder(id: string, userId: string): Promise<IOrder> {
    try {
      const response = await api.get(`/orders/${id}`, { params: { userId } });
      if (!response.data.data) {
        throw new Error('Failed to fetch order!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async createOrder(order: ICreateOrder): Promise<IOrder> {
    try {
      const response = await api.post('/orders', order);
      if (!response.data.data) {
        throw new Error('Failed to create order!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id: string, order: ICreateOrder): Promise<IOrder> {
    try {
      const response = await api.put(`/orders/${id}`, order);
      if (!response.data.data) {
        throw new Error('Failed to update order!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id: string, status: IUpdateStatus): Promise<void> {
    try {
      await api.put(`/orders/${id}/update-status`, status);
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
