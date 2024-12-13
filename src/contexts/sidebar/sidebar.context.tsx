"use client"
import { useTheme } from "@/hooks"
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

type SidebarContextType = {
  isExpanded: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useTheme()

  const [isExpanded, setIsExpanded] = useState(true)

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev)
  }

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false)
    }
  }, [isMobile])

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}
