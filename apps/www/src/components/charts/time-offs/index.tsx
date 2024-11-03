import React from "react"
import { getTimeOffChart } from "@/_server/handlers/timeoff"
import { endOfYear, startOfYear } from "date-fns"

import Timeline from "../default/timeline"

const TimeOffCharts = async () => {
  const data = await getTimeOffChart({
    start: startOfYear(new Date()).toISOString(),
    end: endOfYear(new Date()).toISOString(),
  })
  return (
    <div>
      <Timeline data={data} />
    </div>
  )
}

export default TimeOffCharts
