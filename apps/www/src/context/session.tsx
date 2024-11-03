"use client"

import { createContext, ReactNode, useContext, useLayoutEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { hasPerm } from "@/_server/helpers/hasPerm"

import { isSuperUser } from "@/lib/user"

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
  const pathname = usePathname()

  const router = useRouter()
  useLayoutEffect(() => {
    const empUrl = `/org/${org?.slug}/employee/${session.user.username}`
    if (!isSuperUser(session?.employee?.role) && !pathname?.includes(empUrl)) {
      router.replace(empUrl)
    }
  }, [pathname])

  return (
    <Context.Provider value={{ session, org }}>{children}</Context.Provider>
  )
}

export const useSession = () => useContext(Context)
