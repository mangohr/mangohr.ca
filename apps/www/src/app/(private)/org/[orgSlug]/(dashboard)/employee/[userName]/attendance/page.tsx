import React from "react"
import { getEmployeeAttendance } from "@/_server/handlers/attendance"
import SetAttendanceForm from "@/forms/attendance/setAttendance"

import Timer from "@/components/ui/timer"

import AttendanceList from "./components/list"

export default async function Page({ params }: { params: any }) {
  const result = await getEmployeeAttendance(params)
  return (
    <div className="space-y-6">
      <SetAttendanceForm
        empUsername={params.userName}
        latest={result.latestAttendance}
      />
      <AttendanceList data={result.history} />
    </div>
  )
}
