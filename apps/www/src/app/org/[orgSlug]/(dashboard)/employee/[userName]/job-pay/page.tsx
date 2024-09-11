import React from "react"
import { getEmployeeJobs } from "@/_server/handlers/job"

import JobPay from "./components"

export default async function Page({ params }: any) {
  const result = await getEmployeeJobs(params)
  return <JobPay result={result} />
}
