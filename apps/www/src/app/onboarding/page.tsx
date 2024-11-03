"use client"

import React, { useTransition } from "react"
import { inviteEmployeeAction } from "@/_server/actions/invite"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/components/ui/loading"
import { MultiStepForm } from "@/components/custom/step-form"

function Step1() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Whats your full name?</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="John Doe"
                  aria-labelledby="names"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>How did you find MangoHR?</FormLabel>
            <div>
              <FormControl>
                <ButtonGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-4"
                >
                  <ButtonGroupItem
                    className="col-span-2"
                    value="search"
                    label="Internet Search Result"
                  />
                  <ButtonGroupItem
                    className="col-span-2"
                    value="referral"
                    label="Referred by someone who I know."
                  />
                  <ButtonGroupItem value="linkedin" label="Linkedin" />
                  <ButtonGroupItem value="youtube" label="Youtube" />
                  <ButtonGroupItem value="reddit" label="Reddit" />{" "}
                  <ButtonGroupItem value="x" label="X.com" />
                  <ButtonGroupItem value="facebook" label="Facebook" />
                  <ButtonGroupItem value="instagram" label="Instagram" />
                  <ButtonGroupItem
                    className="col-span-2"
                    value="other"
                    label="Other"
                  />
                </ButtonGroup>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

const Page = () => {
  const [isPending, startTransition] = useTransition()

  const addEmployeeFormSteps: Parameters<typeof MultiStepForm>[0]["schema"] = {
    general: {
      title: "General Information",
      validate: z.any(),
      defaultValues: "",
      component: <Step1 />,
    },
    org: {
      title: "Let's setup your company.",
      validate: z.any(),
      defaultValues: "",
      component: <Step1 />,
    },
  }

  const handleSubmit = (val: any) => {
    startTransition(() => {
      toast.promise(inviteEmployeeAction(val), {
        error: (e) => "Something went wrong while onboarding you!",
      })
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
    <div className="bg-secondary flex min-h-screen flex-col p-8">
      <div className="bg-background m-auto w-full max-w-screen-md gap-12 border p-12 drop-shadow-md">
        <div className="">
          <MultiStepForm
            schema={addEmployeeFormSteps}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default Page

// import React from "react"

// const page = () => {
//   return <div>page</div>
// }

// export default page
