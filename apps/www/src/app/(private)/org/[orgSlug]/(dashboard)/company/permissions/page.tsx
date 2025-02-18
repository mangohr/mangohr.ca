import React from "react"
import { getAllEmployeesRoles } from "@/_server/handlers/employee"

import PermissionInfo from "../components/permissions"

export default async function Page({
  params,
}: {
  params: { orgSlug: string }
}) {
  const data = await getAllEmployeesRoles()
  return <PermissionInfo data={data} />
}
