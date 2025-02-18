"use client"

import React, { useTransition } from "react"
import { onboardAction } from "@/_server/actions/onboard"
import { userSchema } from "@/schema/user"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"

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
        name="full_name"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Whats your full name?</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="John Doe"
                  aria-labelledby="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <div className="flex gap-4 w-full">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Whats your company name?</FormLabel>
              <div>
                <FormControl>
                  <Input
                    size={"lg"}
                    placeholder="Acme Inc"
                    aria-labelledby="company_name"
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
          name="designation"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Your Designation</FormLabel>
              <div>
                <FormControl>
                  <Input
                    size={"lg"}
                    placeholder="HR Manager"
                    aria-labelledby="company_name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="total_employees"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>How many employees?</FormLabel>
            <div>
              <FormControl>
                <ButtonGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-5"
                >
                  <ButtonGroupItem value="1" label="Just you?" />
                  <ButtonGroupItem value="1-10" label="1-10" />
                  <ButtonGroupItem value="10-50" label="20-50" />
                  <ButtonGroupItem value="50-100" label="50-100" />
                  <ButtonGroupItem value="100+" label="100+" />
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

function Step2() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="referral"
        render={({ field }) => (
          <FormItem className="">
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
      validate: userSchema.onboard.create.validate.shape.general,
      defaultValues: "",
      component: <Step1 />,
    },
    other: {
      title: "How did you find MangoHR?",
      validate: userSchema.onboard.create.validate.shape.other,
      defaultValues: "",
      component: <Step2 />,
    },
  }

  const handleSubmit = (val: any) => {
    console.log(val)
    startTransition(() => {
      toast.promise(onboardAction(val), {
        error: (e) => "Something went wrong while onboarding you!",
      })
    })
  }

  if (isPending)
    return (
      <Loading
        className="h-screen"
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
