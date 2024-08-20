import React from "react"
import { getEmployeeTimeOff } from "@/_server/handlers/timeoff"

import EmployeeTimeOffHead from "./components"
import TimeOffList from "./components/list"

export default async function Page({ params }: any) {
  const timeOffs = await getEmployeeTimeOff(params)
  return (
    <div className="space-y-6">
      <EmployeeTimeOffHead />
      <TimeOffList data={timeOffs} />
    </div>
  )
}
