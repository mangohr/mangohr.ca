import React from "react"
import { getEmployeeJobs } from "@/_server/handlers/job"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CurrentJob from "./components/currentJob"
import JobTimeline from "./components/timeline"

export default async function Page({ params }: any) {
  const result = await getEmployeeJobs(params)
  return (
    <div className="space-y-6">
      <CurrentJob />
      <JobTimeline data={result} />
    </div>
  )
}
