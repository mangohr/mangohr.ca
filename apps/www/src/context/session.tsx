"use client"

import { createContext, ReactNode, useContext, useLayoutEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { hasPermission } from "@/iam"

import { isSuperUser } from "@/lib/user"

const Context = createContext<{
  session: Awaited<ReturnType<typeof hasPermission>>["session"] | null
  org: Awaited<ReturnType<typeof hasPermission>>["org"] | null
}>({ session: null, org: null })

export const SessionProvider = ({
  children,
  session,
  org,
}: {
  children: ReactNode
  session: Awaited<ReturnType<typeof hasPermission>>["session"]
  org: Awaited<ReturnType<typeof hasPermission>>["org"]
}) => {
  const pathname = usePathname()

  const router = useRouter()
  useLayoutEffect(() => {
    const empUrl = `/org/${org?.slug}/employee/${session.user.username}`

    if (!isSuperUser(session?.employee?.roles) && !pathname?.includes(empUrl)) {
      router.replace(empUrl)
    }
  }, [pathname])

  return (
    <Context.Provider value={{ session, org }}>{children}</Context.Provider>
  )
}

export const useSession = () => useContext(Context)
