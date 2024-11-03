"use client"

import { ReactNode, useState, useTransition } from "react"
import { createTimeOff } from "@/_server/actions/timeoff"
import { timeOffStatus } from "@/constants/employee"
import { queryKeys } from "@/constants/queryKeys"
import { timeoffSchema } from "@/schema/timeoff"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SelectEmployee } from "@/components/combobox/selectEmployee"

export default function AddTimeOffForm({ trigger }: { trigger: ReactNode }) {
  const queryClient = useQueryClient()
  const [pending, setTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof timeoffSchema.create.validate>>({
    resolver: zodResolver(timeoffSchema.create.validate),
    defaultValues: {
      request_reason: "",
      start_date: new Date().toString(),
      cost: 0.5,
      type: "",
      status: timeOffStatus[0],
    },
  })

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      createTimeOff(val).then((v) => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.timeoffList] })
        form.reset()
        setOpen(false)
      })
    })
  })

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Time-off Form</DialogTitle>
            <DialogDescription>
              {"Let's add a new timeoff for an employee."}
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Form {...form}>
              <form
                id={"new-attendance"}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                        <FormLabel>Select Employee</FormLabel>
                        <div>
                          <FormControl>
                            <SelectEmployee
                              size="full"
                              selected={field.value}
                              setSelected={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                      <FormLabel>Starting Date</FormLabel>
                      <div>
                        <FormControl>
                          <DatePicker
                            mode="single"
                            selected={new Date(field.value) || undefined}
                            onSelect={(e) =>
                              field.onChange(e?.toISOString() || undefined)
                            }
                            disabled={(date) => date < new Date()}
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
                  name="status"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[200px,auto] items-center gap-6">
                      <FormLabel>Status</FormLabel>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeOffStatus.map((e, i) => (
                              <SelectItem
                                key={i}
                                value={e}
                                className={"capitalize"}
                              >
                                {e.replaceAll("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

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
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={pending}>
                  Add Time-off
                </Button>
              </form>
            </Form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
