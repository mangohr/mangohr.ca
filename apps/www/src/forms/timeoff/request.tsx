"use client"

import React, { useTransition } from "react"
import { employeeTimeOffRequest } from "@/_server/actions/employee"
import { getEmployeeTimeOff } from "@/_server/handlers/timeoff"
import { timeoffSchema } from "@/schema/timeoff"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { idGenerate } from "@/lib/idGenerate"
import { DateTimePicker } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export default function TimeOffRequestForm({
  id,
  onSubmit,
  empUsername,
  setDataOptimistic,
}: {
  id: string
  onSubmit: (val: any) => void
  setDataOptimistic: (
    val: Awaited<ReturnType<typeof getEmployeeTimeOff>>[0]
  ) => void
  empUsername: string
}) {
  const [_, setTransition] = useTransition()

  const form = useForm<z.infer<typeof timeoffSchema.request.validate>>({
    resolver: zodResolver(timeoffSchema.request.validate),
    defaultValues: {
      request_reason: "",
      start_date: new Date().toString(),
      cost: 1,
      type: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      employeeTimeOffRequest({ formData: val, username: empUsername })
      setDataOptimistic({
        status: "pending",
        action_by: null,
        action_message: null,
        employee_id: null,
        created_at: new Date(),
        end_date: new Date(addDays(val.start_date, val.cost).toString()),
        id: idGenerate(),
        org_id: null,
        request_reason: val.request_reason,
        start_date: new Date(val.start_date),
        cost: String(val.cost),
        type: val.type,
      })
    })
    onSubmit && onSubmit(val)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Time-off</CardTitle>
        <CardDescription>
          Fill the form below to request time-off
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} id={id} className="space-y-6">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                  <FormLabel>Starting Date</FormLabel>
                  <div>
                    <FormControl>
                      <DateTimePicker
                        granularity="day"
                        value={
                          (field.value && new Date(field.value)) || undefined
                        }
                        // modal={true}
                        onChange={field.onChange}
                        // disabled={
                        //   (field.value && new Date(field.value) < new Date()) ||
                        //   undefined
                        // }
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                  <FormLabel>How many days?</FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        placeholder="1.5"
                        {...field}
                        className="max-w-md"
                        type="number"
                        suffixEl={<span className="text-sm">Day(s)</span>}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                  <FormLabel>Leave Type</FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        placeholder="Sick leave"
                        {...field}
                        className="max-w-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="request_reason"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Request Reason</FormLabel>
                  <div>
                    <FormControl>
                      <Textarea
                        placeholder="Write reason for timeoff here..."
                        className="min-h-56"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
