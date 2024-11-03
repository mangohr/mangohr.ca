"use client"

import React, { useTransition } from "react"
import { createOrgAction } from "@/_server/actions/org"
import orgSchema from "@/schema/org"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/components/ui/loading"
import SideLayout from "@/components/custom/layouts/sideLayout"
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
            <FormLabel>Name</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="Acme Inc."
                  aria-labelledby="name"
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
        name="email"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Email</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="contact@acme.inc"
                  aria-labelledby="email"
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
        name="established_on"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Established On</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  //   placeholder="Established On"
                  type="date"
                  aria-labelledby="established_on"
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
        name="industry"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Industry</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="Software"
                  aria-labelledby="industry"
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
        name="phone"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Phone</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="+12 15164546456"
                  aria-labelledby="phone"
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
        name="website"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Website</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="www.acme.inc"
                  aria-labelledby="website"
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
        name="location"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Location</FormLabel>
            <div>
              <FormControl>
                <Input
                  size={"lg"}
                  placeholder="Toronto, Canada"
                  aria-labelledby="location"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* <FormField
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
      /> */}
    </div>
  )
}

// function Step2() {
//   return (
//     <CompanyOfficeForm
//       data={null}
//       setData={(val) => console.log(val)}
//       trigger={
//         <Button variant={"outline"} className="h-16 w-full text-lg">
//           <span className="">Add Office</span>
//         </Button>
//       }
//     />
//   )
// }

const Page = () => {
  const [isPending, startTransition] = useTransition()

  const addEmployeeFormSteps: Parameters<typeof MultiStepForm>[0]["schema"] = {
    // general: {
    //   title: "Organization Information",
    //   validate: orgSchema.create.validate,
    //   defaultValues: "",
    //   component: <Step1 />,
    // },
    general: {
      title: "General Information",
      validate: orgSchema.create.validate.shape.general,
      defaultValues: {
        name: "",
        email: "",
        industry: "",
        phone: "",
        established_on: new Date().toISOString(),
        website: "",
        location: "",
      } satisfies z.infer<typeof orgSchema.create.validate.shape.general>,
      component: <Step1 />,
    },
    // org: {
    //   title: "Let's setup your company.",
    //   validate: z.any(),
    //   defaultValues: "",
    //   component: <Step2 />,
    // },
  }

  const handleSubmit = (val: any) => {
    startTransition(() => {
      toast.promise(createOrgAction(val), {
        error: (e) => "Something went wrong while onboarding you!",
      })
    })
  }

  if (isPending)
    return (
      <Loading
        title="Creating..."
        description="Hold tight we're creating an company"
      />
    )

  return (
    <SideLayout
      title="New Company"
      tag={"Let's add new company"}
      // description="You have been invited to join company."
    >
      <MultiStepForm schema={addEmployeeFormSteps} onSubmit={handleSubmit} />
    </SideLayout>
  )
}

export default Page

// import React from "react"

// const page = () => {
//   return <div>page</div>
// }

// export default page
