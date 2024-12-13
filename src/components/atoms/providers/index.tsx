// components/Providers.tsx
import React from "react"
import { Providers } from "@/types"

const ProvidersLoader: React.FC<Providers> = ({ children, providers }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>
  }, <>{children}</>)
}

export default ProvidersLoader
