"use client"

import { createContext, ReactNode, useContext } from "react"
import { hasPerm } from "@/_server/helpers/hasPerm"

const Context = createContext<{
  session: Awaited<ReturnType<typeof hasPerm>>["session"] | null
  org: Awaited<ReturnType<typeof hasPerm>>["org"] | null
}>({ session: null, org: null })

export const SessionProvider = ({
  children,
  session,
  org,
}: {
  children: ReactNode
  session: Awaited<ReturnType<typeof hasPerm>>["session"]
  org: Awaited<ReturnType<typeof hasPerm>>["org"]
}) => {
  return (
    <Context.Provider value={{ session, org }}>{children}</Context.Provider>
  )
}

export const useSession = () => useContext(Context)
