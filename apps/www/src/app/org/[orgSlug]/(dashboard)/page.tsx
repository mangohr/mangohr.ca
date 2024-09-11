import React from "react"
import { getDashboardData } from "@/_server/handlers/dashboard"
import { auth } from "@/auth"
import { format, subDays } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LeaveRequestCard } from "./components/cards/leaveRequests"
import { AttendanceChart } from "./components/charts/attendance"
import { EmploymentChart } from "./components/charts/employment"
import { TopAttendees } from "./components/charts/topAttendees"

async function Page() {
  const session = await auth()

  const startDate = subDays(new Date(), 30).toISOString()
  const endDate = new Date().toISOString()

  const data = await getDashboardData({ startDate, endDate })

  let totalEmployeeCount: number = 0,
    totalAttendanceCount: number = 0,
    totalTimeoffRequests: number = 0

  data.totalEmployees.forEach((e) => {
    totalEmployeeCount += Number(e.p1)
  })

  data.totalAttendance.forEach((e) => {
    totalAttendanceCount += Number(e.p1)
  })

  data.totalTimeOffs.forEach((e) => {
    totalTimeoffRequests += Number(e.p1)
  })

  const today = new Date()
  const hrs = today.getHours()
  let greet

  if (hrs < 12) greet = "Good Morning"
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon"
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening"

  return (
    <div className="space-y-8 px-8 py-12">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          {greet}, {session?.user?.name}!
        </h1>
        <p className="text-foreground max-w-2xl font-light">
          It&apos;s {format(today, "cccc, dd MMMM yyyy")}
        </p>
      </div>
      <Card className="grid grid-cols-4">
        <div className="col-span-3 grid grid-cols-3">
          <div className="flex flex-col justify-between p-4">
            <div className="">
              <CardDescription>New Joinees</CardDescription>
              <CardTitle className="text-2xl">
                {String(totalEmployeeCount).padStart(2, "0")}
                <span className="ml-1 text-base font-light">Hired</span>
              </CardTitle>
            </div>
            <AttendanceChart
              startDate={startDate}
              endDate={endDate}
              data={data.totalEmployees || []}
              label={{ p1: "Hired" }}
            />
          </div>
          <div className="flex flex-col justify-between border-l p-4">
            <div className="">
              <CardDescription>Attendance</CardDescription>
              <CardTitle className="text-2xl">
                {" "}
                {String(totalAttendanceCount).padStart(2, "0")}
                <span className="ml-1 text-base font-light">Hrs</span>
              </CardTitle>
            </div>
            <AttendanceChart
              startDate={startDate}
              endDate={endDate}
              data={data.totalAttendance || []}
              label={{ p1: "Hours" }}
            />
          </div>
          <div className="flex flex-col justify-between border-l p-4">
            <div className="">
              <CardDescription>Time-off</CardDescription>
              <CardTitle className="text-2xl">
                {" "}
                {String(totalTimeoffRequests).padStart(2, "0")}{" "}
                <span className="ml-0.5 text-base font-light">Requests</span>
              </CardTitle>
            </div>
            <AttendanceChart
              startDate={startDate}
              endDate={endDate}
              data={data.totalTimeOffs || []}
              label={{ p1: "Requests" }}
            />
          </div>
        </div>
        <div className="border-l">
          <div className="p-4">
            <CardTitle className="mb-1">Employment Status</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </div>
          <EmploymentChart data={data.employmentTypes} />
        </div>
      </Card>
      <div className="grid grid-cols-5 gap-4">
        <LeaveRequestCard data={data.recentLeaveRequests} />
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="mb-1">
              Top 5 Employees By Attendance
            </CardTitle>

            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <TopAttendees data={data.topEmployees} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
