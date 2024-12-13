"use client"
import { LoadingSpinner } from "@/components/atoms"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth, useToast } from "@/hooks"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LoginForm() {
  const { push } = useRouter()
  const { login, user, } = useAuth()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Card className="mx-auto max-w-sm bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
      {user && <LoadingSpinner />}
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              setIsLoading(true)

              const formData = new FormData(e.currentTarget)
              const email = formData.get("email") as string
              const password = formData.get("password") as string

              await login(email, password)
              push("/")
            } catch {
              toast({
                title: "Error",
                description: "Invalid email or password",
              })
            } finally {
              setIsLoading(false)
            }
          }}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-slate-600 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-800 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
