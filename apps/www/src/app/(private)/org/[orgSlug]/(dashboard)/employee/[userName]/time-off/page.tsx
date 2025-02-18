import React from "react"
import { getEmployeeTimeOff } from "@/_server/handlers/timeoff"

import EmployeeTimeOff from "./components"

export default async function Page({ params }: any) {
  const timeOffs = await getEmployeeTimeOff(params)
  return (
    <div className="space-y-6">
      <EmployeeTimeOff list={timeOffs} />
    </div>
  )
}
