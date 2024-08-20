import React from "react"
import { getWorkSchedules } from "@/_server/handlers/org"

import WorkScheduleInfo from "../components/work-schedule"

export default async function Page({
  params,
}: {
  params: { orgSlug: string }
}) {
  const data = await getWorkSchedules()
  return <WorkScheduleInfo data={data} />
}
