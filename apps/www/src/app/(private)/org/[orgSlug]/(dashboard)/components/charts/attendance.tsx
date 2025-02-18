"use client"

import { addDays, differenceInDays, format } from "date-fns"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function AttendanceChart({
  data = [],
  label,
  startDate,
  endDate,
}: {
  data: Array<{
    date: string
    p1: string | number
  }>
  label: { p1: string }
  startDate: string
  endDate: string
}) {
  const diffDays = differenceInDays(endDate, startDate)
  let chatData = []

  for (let index = 0; index < diffDays; index++) {
    const c = addDays(startDate, index)
    const date = format(c, "dd/MM/yyyy")
    const hasData = data.find((d) => d.date == date)
    chatData.push({ name: format(c, "PP"), p1: hasData?.p1 || 0 })
  }
  const chartConfig = {
    p1: {
      label: label.p1,
      color: "hsl(var(--chart-1))",
    },
    // p2: {
    //   label: ,
    //   color: "hsl(var(--chart-2))",
    // },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chatData}
        margin={{
          left: 12,
          right: 12,
          top: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const d = format(value, "dd MMM")
            return (d && d) || value
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Area
          dataKey="p1"
          type="linear"
          fill="var(--color-p1)"
          fillOpacity={0.4}
          stroke="var(--color-p1)"
          stackId="a"
        />
        {/* <Area
          dataKey="p2"
          type="linear"
          fill="var(--color-p2)"
          fillOpacity={0.4}
          stroke="var(--color-p2)"
          stackId="a"
        /> */}
        {/* <ChartLegend content={<ChartLegendContent />} /> */}
      </AreaChart>
    </ChartContainer>
  )
}
