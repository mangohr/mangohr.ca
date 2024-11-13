"use client"

import { useEffect, useTransition } from "react"
import { updateOrgAction } from "@/_server/actions/org"
import { useOrg } from "@/context/org"
import orgSchema from "@/schema/org"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { DateTimePicker } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const OrgFormDefaultValues = {
  slug: "",
  name: "",
  phone: "",
  email: "",
  industry: "",
  picture: "",
  website: "",
  bio: "",
  location: "",
  established_on: new Date(),
}

export function OrgGeneralForm({
  id,
  onSubmit,
}: {
  id: string
  onSubmit?: () => void
}) {
  const [_, setTransition] = useTransition()
  const { org, setOptimistic } = useOrg()
  const form = useForm({
    resolver: zodResolver(orgSchema.update.validate),
    defaultValues: OrgFormDefaultValues,
  })

  useEffect(() => {
    org && form.reset(org || {})
  }, [org])

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      updateOrgAction(val)
      setOptimistic(((p: any) => ({ ...p, ...val })) as any)
    })
    onSubmit && onSubmit()
  })

  return (
    <Form {...form}>
      <form id={id} onSubmit={handleSubmit}>
        <OrgGeneralFormContent />
      </form>
    </Form>
  )
}

export function OrgGeneralFormContent() {
  const form = useFormContext<z.infer<typeof orgSchema.update.validate>>()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="grid grid-cols-[auto,200px]">
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Company Name</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Acme Inc" {...field} />
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
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Company Website</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="www.acme.inc" {...field} />
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
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Company Email</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="example@acme.inc" {...field} />
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
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Company Phone</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="+12234543535" {...field} />
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
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Company Industry</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Software Company" {...field} />
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
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Location</FormLabel>
                <div>
                  <FormControl>
                    <Input placeholder="Toronto, Canada" {...field} />
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
              <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                <FormLabel>Established on</FormLabel>
                <div>
                  <FormControl>
                    <DateTimePicker
                      granularity="day"
                      value={
                        (field.value && new Date(field.value)) || undefined
                      }
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[200px,auto] items-start gap-6">
                <FormLabel className="block pt-2">Bio</FormLabel>
                <div>
                  <FormControl>
                    <Textarea
                      className="h-56"
                      placeholder="Write something about your company..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
