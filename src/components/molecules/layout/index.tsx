"use client"
import Header from "@/components/atoms/header"
import Page from "@/components/atoms/page"
import Sidebar from "@/components/atoms/sidebar"
import { useAuth } from "@/contexts"
import { Children } from "@/types"
import React from "react"

const Layout: React.FC<Children> = ({ children }) => {
  const { user } = useAuth()

  return (
    <div>
      <Header />
      <div className="flex">
        {user && <Sidebar />}
        <Page>{children}</Page>
      </div>
    </div>
  )
}

export default Layout
