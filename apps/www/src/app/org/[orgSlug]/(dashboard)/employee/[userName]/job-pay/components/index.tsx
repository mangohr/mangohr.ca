"use client"

import React, { useOptimistic } from "react"
import { getEmployeeJobs } from "@/_server/handlers/job"
import { useEmployee } from "@/context/employee"
import employeeSchema from "@/schema/employee"
import { z } from "zod"

import CurrentJob from "./currentJob"
import JobTimeline from "./timeline"

const JobPay = ({
  result,
}: {
  result: Awaited<ReturnType<typeof getEmployeeJobs>>
}) => {
  const { employee, setOptimisticEmployee } = useEmployee()
  const cj = employee?.current_job
  const [data, setOptimisticData] = useOptimistic(result)

  const onOptimistic = (
    data: z.infer<typeof employeeSchema.currentJob.create.validate>
  ) => {
    setOptimisticEmployee(((p: any) => ({ ...p, current_job: data })) as any)
    setOptimisticData((p) => [data, ...p] as any)
  }

  return (
    <div className="space-y-6">
      <CurrentJob data={cj} setOptimistic={onOptimistic} />
      <JobTimeline data={data} />
    </div>
  )
}

export default JobPay
