import React, { ReactNode } from "react"
import { SessionProvider } from "@/context/session"
import orgSchema from "@/schema/org"

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: any
}) {
  const { org, session } = await orgSchema.get.permission(params.orgSlug)

  return (
    <>
      <SessionProvider session={session} org={org}>
        {children}
      </SessionProvider>
    </>
  )
}
