"use client"

import * as React from "react"
import { getDashboardData } from "@/_server/handlers/dashboard"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// const chartData = [
//   { type: "full_time", count: 275, fill: "var(--color-full_time)" },
//   { type: "part_time", count: 200, fill: "var(--color-part_time)" },
//   { type: "probation", count: 287, fill: "var(--color-probation)" },
// ]

export function EmploymentChart({
  data = [],
}: {
  data: Awaited<ReturnType<typeof getDashboardData>>["employmentTypes"]
}) {
  const len = data.length

  let totalCount: number = 0
  const chartConfig: ChartConfig = {
    count: {
      label: "Count",
    },
  }

  const chartData = data.map((d, i) => {
    const opacityFactor = 1 - Math.floor(i / len) * 0.1
    const baseIndex = (i % len) + 1

    let color = `hsl(var(--chart-${baseIndex})/${opacityFactor})`
    if (d.type === "un_assigned") color = `hsl(var(--border))`

    chartConfig[d.type] = {
      label: d.type.replaceAll("_", " "),
      color,
    }
    totalCount += Number(d.count)
    return { type: d.type, count: Number(d.count), fill: color }
  })
  return (
    <div className="relative bottom-6">
      <ChartContainer config={chartConfig} className="mx-auto size-[15vw]">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel className="capitalize" />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="type"
            innerRadius={"55%"}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-medium"
                      >
                        {String(totalCount).padStart(2, "0")}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 25}
                        className="fill-muted-foreground"
                      >
                        Employees
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}
