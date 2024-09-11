"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useEmployee } from "@/context/employee"
import EmployeeCurrentJobForm from "@/forms/employee/currentJob"
import employeeSchema from "@/schema/employee"
import { Plus } from "lucide-react"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CurrentJob = ({
  data,
  setOptimistic,
}: {
  data:
    | NonNullable<ReturnType<typeof useEmployee>["employee"]>["current_job"]
    | undefined
  setOptimistic: (
    val: z.infer<typeof employeeSchema.currentJob.create.validate>
  ) => void
}) => {
  const [edit, setEdit] = useState(false)
  const { userName } = useParams()

  const formId = "current-job-form"

  return (
    <Card>
      <CardHeader className="grid grid-cols-2 items-center">
        <CardTitle>Current Job</CardTitle>
        <div className="ml-auto flex space-x-4">
          {edit ? (
            <>
              <Button variant={"outline"} onClick={() => setEdit(false)}>
                Cancel
              </Button>
              <Button form={formId} variant={"default"} type="submit">
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant={"outline"}
              // size={"icon"}
              onClick={() => setEdit(true)}
            >
              <Plus /> <span>New Job</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {edit ? (
          <div>
            <EmployeeCurrentJobForm
              id={formId}
              employeeUsername={userName.toString()}
              onSubmit={() => setEdit(false)}
              setDataOptimistic={setOptimistic}
            />
          </div>
        ) : (
          <div className="grid grid-cols-[200px,auto] gap-6 capitalize">
            <p className="text-muted-foreground">Designation</p>
            <p>{data?.title || "No Designation"}</p>
            <p className="text-muted-foreground">Type</p>
            <p>{data?.type?.replaceAll("_", " ") || "-"}</p>
            <p className="text-muted-foreground">Reports to</p>
            <p className="flex items-center space-x-2">
              {data?.reports_to?.image && (
                <Avatar className="size-6">
                  <AvatarImage src={data?.reports_to?.image || ""} />
                  <AvatarFallback>
                    {data?.reports_to?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              )}
              <span>{data?.reports_to?.name || "Not Assigned"}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CurrentJob
