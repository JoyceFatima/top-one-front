import api from '@/configs/api';

export class RolesRequests {
  async fetchRoles(): Promise<[]> {
    try {
      const response = await api.get('/roles');
      if (!response.data.data) {
        throw new Error('Failed to fetch roles!');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}
