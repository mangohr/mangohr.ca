"use client"

import React, { ReactElement, useEffect, useState, useTransition } from "react"
import { createOrgAction } from "@/_server/actions/org"
import { updateScheduleAction } from "@/_server/actions/schedule"
import { getWorkSchedules } from "@/_server/handlers/org"
import workScheduleSchema from "@/schema/work-schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { days } from "@/lib/calendar"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CompanyWorkScheduleForm({
  trigger,
  setData,
  data,
}: {
  data: Awaited<ReturnType<typeof getWorkSchedules>>["items"][0] | null
  trigger: ReactElement
  setData: (
    val: Awaited<ReturnType<typeof getWorkSchedules>>["items"][0]
  ) => void
}) {
  const [open, setOpen] = useState(false)
  const defaultValues = {
    id: undefined,
    name: "",
    daily_hrs: Array(7).fill(0),
    total_hrs: 0,
    work_hrs: 0,
    type: "hour" as const,
    active: true,
  }
  const form = useForm<z.infer<typeof workScheduleSchema.edit.validate>>({
    resolver: zodResolver(workScheduleSchema.edit.validate),
    defaultValues,
  })

  useEffect(() => {
    return form.reset({ ...defaultValues, ...data } as any)
  }, [open, data])

  const [isPending, startTransition] = useTransition()
  const onSubmit = form.handleSubmit((val) => {
    setOpen(false)
    startTransition(() => {
      setData({
        org_id: "",
        created_at: null,
        ...val,
      } as any)
      updateScheduleAction(val)
    })
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="grid grid-cols-[auto,200px]">
          <DialogTitle>Work Schedule Info</DialogTitle>
          <div className="relative flex justify-end"></div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <DialogBody className="grid grid-cols-[200px,auto] items-start gap-x-24 gap-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">Schedule Name</FormLabel>
                    <div>
                      <FormControl>
                        <Input placeholder="Write Schedule Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="work_hrs"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">Work hrs per day</FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          prefixEl={<Clock />}
                          suffixEl={"hrs"}
                          placeholder="8"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="effective_from"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">Effective form</FormLabel>
                    <div>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onSelect={field.onChange}
                          modal={true}
                          mode="single"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">Schedule type</FormLabel>
                    <div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hour">Hour Based</SelectItem>
                            <SelectItem value="day">Day Based</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="total_hrs"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">
                      {" "}
                      Total work hrs per week
                    </FormLabel>
                    <div>
                      <FormControl>
                        <Input
                          prefixEl={<Clock />}
                          suffixEl={"hrs"}
                          placeholder="8"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />

              <FormField
                control={form.control}
                name="daily_hrs"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">Daily work hours</FormLabel>
                    <div>
                      <FormControl>
                        {/* <Input
                        prefixEl={<Clock />}
                        suffixEl={"hrs"}
                        placeholder="8"
                        type="number"
                        {...field}
                      /> */}
                        <ul className="space-y-2 rounded-md border p-4">
                          {field?.value?.map((f, i) => (
                            <li
                              key={i}
                              className="grid max-w-xs grid-cols-2 items-center"
                            >
                              <FormLabel className="mt-2">{days[i]}</FormLabel>
                              <span>
                                <Input
                                  prefixEl={<Clock />}
                                  suffixEl={"hrs"}
                                  placeholder="008"
                                  type="number"
                                />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormLabel className="mt-2">Is Active</FormLabel>
                    <div>
                      <FormControl>
                        <Switch />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </>
                )}
              />
              {/* <div>
                  <ul className="space-y-2">
                    {d.daily.map((d, i) => (
                      <li key={i} className="grid grid-cols-2 max-w-xs">
                        <span>{days[i]}</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div> */}
            </DialogBody>
            <DialogFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
