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
        <div className="bg-muted/40 flex min-h-screen w-full overflow-x-auto">
          <Sidebar />
          <main className="flex min-h-screen flex-1 flex-col">
            {/* <Header session={session} /> */}
            <div className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {children}
            </div>
          </main>
        </div>
      </OrgProvider>
    </>
  )
}
