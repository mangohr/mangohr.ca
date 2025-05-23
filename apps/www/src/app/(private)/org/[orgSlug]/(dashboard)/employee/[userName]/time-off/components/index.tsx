"use client"

import React, { useOptimistic, useState } from "react"
import { useParams } from "next/navigation"
import { getEmployeeTimeOff } from "@/_server/handlers/timeoff"
import TimeOffRequestForm from "@/forms/timeoff/request"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import TimeOffList from "./list"

const EmployeeTimeOff = ({
  list,
}: {
  list: Awaited<ReturnType<typeof getEmployeeTimeOff>>
}) => {
  const [data, setOptimisticData] = useOptimistic(list)

  const [edit, setEdit] = useState(false)

  const formId = "request-timeoff"
  const { userName } = useParams() as any

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Time Off Requests</h1>
          <Label>View list of time-off requests.</Label>
        </div>

        <div className="ml-auto flex space-x-4">
          {edit ? (
            <>
              <Button variant={"outline"} onClick={() => setEdit(false)}>
                Cancel
              </Button>
              <Button variant={"default"} type="submit" form={formId}>
                Send Request
              </Button>
            </>
          ) : (
            <Button variant={"outline"} onClick={() => setEdit(true)}>
              <Plus />
              <span>Request Time-off</span>
            </Button>
          )}
        </div>
      </div>
      {edit && (
        <TimeOffRequestForm
          id={formId}
          onSubmit={() => setEdit(false)}
          empUsername={userName}
          setDataOptimistic={(val) => setOptimisticData((p) => [val, ...p])}
        />
      )}
      <TimeOffList data={data} />
    </div>
  )
}

export default EmployeeTimeOff
