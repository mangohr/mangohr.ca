import React from "react"
import { getEmployeeData } from "@/_server/handlers/employee"
import { EmployeeProvider } from "@/context/employee"

import EmployeeLayout from "@/components/custom/layouts/employee"

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: { orgSlug: string; userName: string }
  children: React.ReactNode
}>) {
  const data = await getEmployeeData(params)

  return (
    <EmployeeProvider data={data}>
      <EmployeeLayout>{children}</EmployeeLayout>
    </EmployeeProvider>
  )
}
