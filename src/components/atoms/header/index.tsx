"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, Trophy } from "lucide-react"
import { useAuth, useSidebar, useTheme } from "@/hooks"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ThemeToggle } from "@/components/molecules/theme-toggle"
import { usePathname } from "@/i18n/routing"
import { useParams, useRouter } from "next/navigation"

export const Header: FC = () => {
  const { push } = useRouter()
  const { locale } = useParams()
  const pathname = usePathname()
  const { isMobile } = useTheme()
  const { user, logout } = useAuth()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-slate-100 dark:bg-gray-800 text-black dark:text-white z-50 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center justify-between">
          {user && !isMobile && (
            <Button
              className="p-2 rounded bg-slate-100 dark:bg-gray-800 text-black dark:text-white transition-colors mr-2 hover:bg-slate-200 dark:hover:bg-gray-700 shadow-none"
              onClick={() => toggleSidebar()}
            >
              <Menu size={20} />
            </Button>
          )}

          <div className="flex items-center ml-2 space-x-2">
            <Trophy className="w-6 h-6 text-blue-500 dark:text-yellow-400" />
            <Link
              href="/"
              className="text-lg font-bold text-gray-800 dark:text-gray-300"
            >
              Top One
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 cursor-pointer hover:opacity-80">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-40 bg-white dark:bg-gray-700 text-black dark:text-white border-none">
                <div className="p-2 mb-2">
                  <h2 className="font-semibold">{user.username}</h2>
                  <h5 className="font-thin opacity-60">{user.role}</h5>
                </div>
                <Button
                  className="w-full bg-gray-200 dark:bg-gray-800 dark:text-white text-black hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            !pathname.includes("login") && (
              <Button
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 shadow-none"
                onClick={() => push(`${locale}/auth/login`)}
              >
                Login
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  )
}
