import api from '@/configs/api';
import { IClient } from '@/interfaces/client.interface';

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

  async fetchClient(id: string): Promise<IClient> {
    try {
      const response = await api.get(`/clients/${id}`);
      if (!response.data.data) {
        throw new Error('Failed to fetch client!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async createClient(client: IClient): Promise<IClient> {
    try {
      const response = await api.post('/clients', client);
      if (!response.data.data) {
        throw new Error('Failed to create client!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateClient(id: string, client: IClient): Promise<void> {
    try {
      await api.put(`/clients/${id}`, client);
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
