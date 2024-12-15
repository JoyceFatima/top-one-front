import api from '@/configs/api';
import { IProduct } from '@/interfaces';

export class ProductsRequests {
  async getAll(): Promise<IProduct[]> {
    try {
      const response = await api.get('/products');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
  
  async getOne(id: string): Promise<IProduct> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product: Partial<IProduct>): Promise<IProduct> {
    try {
      const response = await api.post(`/products`, product);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: string, product: Partial<IProduct>): Promise<IProduct> {
    try {
      const response = await api.put(`/products/${id}`, product);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async discountProduct(id: string, product: Partial<IProduct>): Promise<IProduct> {
    try {
      const response = await api.patch(`/products/${id}/discount`, product);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
