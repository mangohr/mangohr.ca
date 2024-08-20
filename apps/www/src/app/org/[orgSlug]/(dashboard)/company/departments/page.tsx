import React from "react"
import { getDepartments } from "@/_server/handlers/org"

import DepartmentsInfo from "./list"

export default async function Page() {
  const departments = await getDepartments()
  return <DepartmentsInfo data={departments} />
}
