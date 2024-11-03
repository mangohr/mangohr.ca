"use client"

import { useTransition } from "react"
import { inviteEmployeeAction } from "@/_server/actions/invite"
import employeeSchema from "@/schema/employee"
import { toast } from "sonner"
import { z } from "zod"

import Loading from "@/components/ui/loading"
import SideLayout from "@/components/custom/layouts/sideLayout"
import { MultiStepForm } from "@/components/custom/step-form"

import NewEmployeeStep1 from "./step1"

const EmployeeForm = () => {
  const [isPending, startTransition] = useTransition()

  const addEmployeeFormSteps: Parameters<typeof MultiStepForm>[0]["schema"] = {
    general: {
      title: "General Information",
      validate: employeeSchema.invite.create.validate.shape.general,
      defaultValues: {
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        job: {
          reports_to: "",
          title: "",
          type: "full_time",
          start_date: new Date().toISOString(),
        },
        action: "create",
      } satisfies z.infer<
        typeof employeeSchema.invite.create.validate.shape.general
      >,
      component: <NewEmployeeStep1 />,
    },
    // org: {
    //   title: "Let's setup your company.",
    //   validate: z.any(),
    //   defaultValues: "",
    //   // component: <AddOrgFromCore />,
    // },
  }

  const handleSubmit = (val: any) => {
    startTransition(() => {
      toast.promise(inviteEmployeeAction(val), {
        error: (e) => e.message || "Something went wrong while onboarding you!",
      })
    })
  }

  if (isPending)
    return (
      <Loading
        title="Creating..."
        description="Hold tight we're adding an employee to your company!"
      />
    )

  return (
    <SideLayout
      title="New Employee"
      tag={"Let's onboard new member"}
      // description="You have been invited to join company."
    >
      <MultiStepForm schema={addEmployeeFormSteps} onSubmit={handleSubmit} />
    </SideLayout>
  )
}

export default EmployeeForm
