import React, { ReactNode } from "react"
import { hasPerm } from "@/_server/helpers/hasPerm"
import { SessionProvider } from "@/context/session"

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: any
}) {
  const { session, org } = await hasPerm({ orgSlug: params.orgSlug })

  return (
    <SessionProvider session={session} org={org}>
      {children}
    </SessionProvider>
  )
}
