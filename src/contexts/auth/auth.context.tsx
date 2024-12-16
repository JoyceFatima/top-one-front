"use client"

import React, { createContext, useState, ReactNode, useEffect } from "react"
import { AuthRequests } from "@/requests"
import { IUser } from "@/interfaces"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "@/i18n/routing"

type AuthContextType = {
  user: IUser | undefined
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<IUser | undefined>(undefined)

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true)
      const response = await AuthRequests.login({ email, password })

      if (!response) {
        logout();
        throw Error('Email or Password is incorrect!');
      }

      setUser(response)
      push("/")
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email or Password is incorrect!",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem("token")
    push("/auth/login")
  }

  const renewToken = async () => {
    try {

      const token = localStorage.getItem("token")
  
  
      if (!token) {
        setLoading(false)
        return
      }
  
      const res = await AuthRequests.renewToken()
      setUser(res)
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Your token is expired, please sign in!",
      })
      push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    renewToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
