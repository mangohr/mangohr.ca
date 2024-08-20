import React from "react"
import { getSingleOrg } from "@/_server/handlers/org"
import { OrgProvider } from "@/context/org"

import Sidebar from "@/components/custom/nav/sidebar"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const org = await getSingleOrg()

  return (
    <>
      <OrgProvider data={org}>
        <div className="flex min-h-screen w-full flex-col overflow-x-auto bg-muted/40">
          <Sidebar />
          <main className="flex min-h-screen flex-col sm:pl-14">
            {/* <Header session={session} /> */}
            {/* <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main> */}
            {children}
          </main>
        </div>
      </OrgProvider>
    </>
  )
}
