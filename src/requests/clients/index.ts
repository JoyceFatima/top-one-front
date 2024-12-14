import api from '@/configs/api';
import { IClient } from './client.interface';

export class ClientsRequests {
  async fetchClients(): Promise<IClient[]> {
    try {
      const response = await api.get('/clients');
      if (!response.data.data) {
        throw new Error('Failed to fetch clients!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      await api.delete(`/clients/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
