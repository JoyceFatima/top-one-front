import { Children } from "@/types"
import React from "react"

const Page: React.FC<Children> = ({ children }) => {
  return <div className="overflow-scroll w-full max-h-screen">{children}</div>
}

export default Page
