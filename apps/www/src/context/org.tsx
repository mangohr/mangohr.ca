"use client"

import { createContext, ReactNode, useContext, useOptimistic } from "react"
import { getSingleOrg } from "@/_server/handlers/org"

const Context = createContext<{
  org: Awaited<ReturnType<typeof getSingleOrg>> | null
  setOptimistic: (val: Awaited<ReturnType<typeof getSingleOrg>>) => void
}>({ org: null, setOptimistic: () => {} })

export const OrgProvider = ({
  children,
  data,
}: {
  children: ReactNode
  data: Awaited<ReturnType<typeof getSingleOrg>>
}) => {
  const [org, setOptimistic] = useOptimistic(data)
  return (
    <Context.Provider value={{ org, setOptimistic }}>
      {children}
    </Context.Provider>
  )
}

export const useOrg = () => useContext(Context)
