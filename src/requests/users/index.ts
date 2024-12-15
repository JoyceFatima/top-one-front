import api from '@/configs/api';
import { IUser } from '@/interfaces';

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

  async fetchUser(id: string): Promise<IUser> {
    try {
      const response = await api.get(`/users/${id}`);
      if (!response.data.data) {
        throw new Error('Failed to fetch user!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: IUser): Promise<IUser> {
    try {
      const response = await api.post('/users', user);
      if (!response.data.data) {
        throw new Error('Failed to create user!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, user: IUser): Promise<void> {
    try {
      await api.put(`/users/${id}`, user);
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(id: string, password: string, newPassword: string): Promise<void> {
    try {
      await api.patch(`/users/${id}/change-password`, { password, newPassword });
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
