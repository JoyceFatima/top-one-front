import api from "@/configs/api"
import { ILogin } from "./auth.interface"
import { IUser } from "@/interfaces"

class AuthRequests {
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
}

export default AuthRequests
