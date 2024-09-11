"use client"

import { useState } from "react"
import { addEmployeeAttendance } from "@/_server/actions/employee"
import { getEmployeeAttendance } from "@/_server/handlers/attendance"
import { differenceInSeconds, format } from "date-fns"
import { Play, Squircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Timer from "@/components/ui/timer"

export default function SetAttendanceForm({
  empUsername,
  latest,
}: {
  empUsername: string
  latest:
    | Awaited<ReturnType<typeof getEmployeeAttendance>>["latestAttendance"]
    | null
}) {
  const [time, setTime] = useState<string>("00:00")
  const [startTime, setStartTime] = useState<string>(
    (latest?.login && new Date(latest?.login).toISOString()) || ""
  )

  const now = new Date()

  const limit = 8 * 60 * 60
  const loggedInTime = differenceInSeconds(new Date(), new Date(startTime))

  const base = loggedInTime > limit ? limit : loggedInTime
  const excess = loggedInTime > limit ? loggedInTime - limit : 0

  const basePer = (base / limit) * 100 || 0
  const excessPer = (excess / limit) * 100 || 0

  const setAttendance = async () => {
    const date = new Date().toISOString()
    setStartTime((prev) => (prev ? "" : new Date().toISOString()))
    await addEmployeeAttendance({ formData: { date }, username: empUsername })
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Record Attendance</CardTitle>
            <CardDescription>{format(now, "PP")}</CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <Timer time={time} setTime={setTime} startTime={startTime} />
            </div>
            <Button
              type="button"
              size="icon-sm"
              variant={!startTime ? "default" : "outline"}
              className={cn(
                "text-sm",
                !startTime && "bg-[hsl(var(--chart-2))] opacity-95"
              )}
              onClick={setAttendance}
            >
              {startTime ? (
                <span className="relative">
                  <Squircle className="fill-destructive size-4 stroke-none" />
                  <Squircle className="-z-1 fill-destructive absolute left-0 top-0 size-4 animate-ping stroke-none" />
                </span>
              ) : (
                <Play />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded">
            <div className="bg-muted flex w-full items-center">
              <div
                className={cn("relative h-6 bg-[hsl(var(--chart-2))]")}
                style={{
                  width: `${basePer === 0 ? 1 : basePer < 5 ? 5 : basePer}%`,
                }}
              ></div>
              <div
                className={cn("h-6 bg-[hsl(var(--chart-1)/0.6)]")}
                style={{
                  width: `${excessPer > 95 ? 95 : excessPer}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
