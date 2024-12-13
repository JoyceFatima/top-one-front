"use client"
import { FC } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSidebar } from "@/contexts/sidebar/sidebar.context"
import { Menu } from "lucide-react"
import { useAuth } from "@/contexts"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

const Header: FC = () => {
  const { user } = useAuth()

  const { isExpanded, toggleSidebar } = useSidebar()

  return (
    <header className="bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center justify-between">
          {user && (
            <button
              className="text-black p-2 rounded hover:bg-slate-200 transition-colors"
              onClick={() => toggleSidebar()}
            >
              {isExpanded ? <Menu size={20} /> : <Menu size={20} />}
            </button>
          )}

          <Link href="/" className="text-lg font-bold text-gray-800 ml-2">
            MyBrand
          </Link>
        </div>
        <div className="flex items-center space-x-4 hover:opacity-80">
          {user ? (
            <Avatar className="w-10 cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full"
              />
              <AvatarFallback className="rounded-full">CN</AvatarFallback>
            </Avatar>
          ) : (
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
