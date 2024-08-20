"use client"

import { getDashboardData } from "@/_server/handlers/dashboard"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  hours: {
    label: "Hours",
    color: "hsl(var(--chart-1))",
  },

  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function TopAttendees({
  data,
}: {
  data: Awaited<ReturnType<typeof getDashboardData>>["topEmployees"]
}) {
  const d = [
    ...data,
    ...Array(5 - data.length).map((d) => ({ name: "TBD", hours: 0 })),
  ]

  return (
    <ChartContainer config={chartConfig} className="h-[225px] w-full">
      <BarChart
        accessibilityLayer
        data={d}
        layout="vertical"
        margin={{
          right: 24,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="hours" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />

        <Bar
          dataKey="hours"
          layout="vertical"
          fill="var(--color-hours)"
          background={{ fill: "hsl(var(--muted))" }}
          radius={4}
          fillOpacity={0.8}
        >
          <LabelList
            dataKey="name"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={12}
          />
          <LabelList
            dataKey="hours"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
