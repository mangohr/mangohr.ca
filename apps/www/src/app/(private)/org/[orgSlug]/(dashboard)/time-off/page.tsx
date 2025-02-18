import React from "react"
import AddTimeOffForm from "@/forms/timeoff/add"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import TimeOffCharts from "@/components/charts/time-offs"
import PageLayout from "@/components/custom/layouts/page"

import TimeOffList from "./components/list"

export default async function Page() {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Time Off</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your employee time-off requests
          </p>
        </div>
        <div className="flex gap-4">
          {/* <Link href={""} className={cn(buttonVariants())}>
            <Plus height={18} width={18} strokeWidth={1.5} />
            <span>Add Request</span>
          </Link> */}
          <AddTimeOffForm
            trigger={
              <Button>
                <Plus />
                <span>Add Time-off</span>
              </Button>
            }
          />
        </div>
      </div>
      <div>
        <TimeOffCharts />
      </div>
      <div className="grid">
        <TimeOffList />
      </div>
    </PageLayout>
  )
}
