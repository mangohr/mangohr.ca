"use client"

import React, { useState } from "react"
import AdminAddAttendanceForm from "@/forms/attendance/updateAttendance"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageLayout from "@/components/custom/layouts/page"

import AttendanceList from "./components/list"

export default function Page() {
  const [open, setOpen] = useState(false)
  return (
    <PageLayout>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your employees attendance
          </p>
        </div>
        <div className="flex gap-4">
          <AdminAddAttendanceForm open={open} setOpen={setOpen} />
          <Button onClick={() => setOpen(true)}>
            <Plus />
            <span>Add Attendance</span>
          </Button>
        </div>
      </div>
      {/* <div>
        <EmployeeBarChart />
      </div> */}
      <div className="grid">
        <AttendanceList />
      </div>
    </PageLayout>
  )
}
