"use client"

import React, { useTransition } from "react"
import { inviteEmployeeAction } from "@/_server/actions/invite"
import {
  EmployeeGeneralFormContent,
  EmployeeGeneralFormDefaultValues,
} from "@/forms/employee/general"
import employeeSchema from "@/schema/employee"

import { Card } from "@/components/ui/card"
import Loading from "@/components/ui/loading"
import { MultiStepForm } from "@/components/custom/step-form"

import { EmployeeProfessionalForm } from "./professionalForm"

export const addEmployeeFormSteps: Parameters<
  typeof MultiStepForm
>[0]["schema"] = {
  general: {
    title: "Personal Information",
    validate: employeeSchema.invite.create.validate.shape.general,
    component: <EmployeeGeneralFormContent />,
    defaultValues: EmployeeGeneralFormDefaultValues,
  },

  professional: {
    title: "Professional Information",
    validate: employeeSchema.invite.create.validate.shape.professional,
    component: (
      <Card className="p-6">
        <EmployeeProfessionalForm />
      </Card>
    ),
    defaultValues: {
      employee_id: "",
    },
  },
}

export const AddEmployeeForm = () => {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (val: any) => {
    startTransition(() => {
      inviteEmployeeAction(val)
    })
  }

  if (isPending)
    return (
      <Loading
        title="Sending..."
        description="Hold tight we're sending an invite"
      />
    )

  return (
    <div className="m-auto min-h-screen w-full max-w-screen-xl gap-12 p-12">
      {/* <div
        className="pattern-paper pattern-indigo-500 pattern-bg-white pattern-size-8 pattern-opacity-20 rounded-lg bg-foreground 
  p-8 text-background"
      >
        <div className="sticky top-10">
          <h2 className="break-words text-4xl font-bold leading-tight">Add</h2>
          <h2 className="break-words text-6xl font-normal leading-tight">
            Employee
          </h2>
        </div>
      </div> */}
      <div className="">
        <MultiStepForm schema={addEmployeeFormSteps} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
