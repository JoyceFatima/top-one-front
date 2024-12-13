import api from "@/configs/api"
import { ILogin } from "./auth.interface"
import { IUser } from "@/interfaces"
import { defineUser } from "@/mocks"

export class AuthRequests {
  static async login(credentials: ILogin): Promise<IUser> {
    try {
      const response = await api.post("/auth/login", credentials)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async getUser(token: string): Promise<IUser | undefined> {
    try {
      return defineUser(token)
    }
    catch (error) {
      throw error
    }
  }
}

