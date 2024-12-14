import api from '@/configs/api';
import { ILogin } from './auth.interface';
import { IUser } from '@/interfaces';

export class AuthRequests {
  static async login(credentials: ILogin): Promise<IUser> {
    try {
      const response = await api.post('/auth/login', credentials);
      if (!response.data.data.token) {
        throw Error('Email or Password is incorrect!')
      }
      localStorage.setItem('token', response.data.data.token);
      return response.data.data.user;
    } catch (error) {
      throw error;
    }
  }

  static async renewToken(): Promise<IUser | undefined> {
    try {
      const response = await api.post('/auth/renew-token');
      if (!response.data.data.token) {
        throw Error('Email or Password is incorrect!')
      }
      localStorage.setItem('token', response.data.data.token);
      return response.data.data.user;
    } catch (error) {
      throw error;
    }
  }
}
