import api from '@/configs/api';
import { IUser } from './user.interface';

export class UsersRequests {
  async fetchUsers(): Promise<IUser[]> {
    try {
      const response = await api.get('/users');
      if (!response.data.data) {
        throw new Error('Failed to fetch users!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
