"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import AuthRequests from "@/requests/auth"
import { IUser } from "@/interfaces"

type AuthContextType = {
  user: IUser | undefined
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined)

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthRequests.login({ email, password })
      setUser(response)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
