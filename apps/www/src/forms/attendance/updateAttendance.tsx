"use client"

import { useEffect, useTransition } from "react"
import {
  getAllAttendance,
  updateAttendance,
} from "@/_server/actions/attendance"
import { queryKeys } from "@/constants/queryKeys"
import attendanceSchema from "@/schema/attendance"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DateTimePicker } from "@/components/ui/calendar"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SelectEmployee } from "@/components/combobox/selectEmployee"

export default function UpdateAttendanceForm({
  open,
  setOpen,
  data,
}: {
  open: boolean
  setOpen: (val: boolean) => void
  data?: Awaited<ReturnType<typeof getAllAttendance>>["items"][0]
}) {
  const queryClient = useQueryClient()
  const [pending, setTransition] = useTransition()
  const schema = attendanceSchema[data?.id ? "update" : "add"]
  const form = useForm<z.infer<typeof schema.validate>>({
    resolver: zodResolver(schema.validate),
    defaultValues: {
      id: data?.id || "",
      employee: data?.username || "",
      login: (data?.login && new Date(data.login).toISOString()) || "",
      logout: (data?.logout && new Date(data?.logout).toISOString()) || "",
    },
  })

  // console.log(data)
  // useEffect(() => {
  //   if (!data) return
  //   form.reset({
  //     id: data?.id || "",
  //     employee: data?.username || "",
  //     login: (data?.login && new Date(data.login).toISOString()) || "",
  //     logout: (data?.logout && new Date(data?.logout).toISOString()) || "",
  //   })
  // }, [data])

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      updateAttendance(val).then((v) => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.attendanceList] })
        form.reset()
        setOpen(false)
      })
    })
  })

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Attendance Form</DialogTitle>
            <DialogDescription>
              {data?.id
                ? "Lets update an attendance"
                : "Let's add an attendance"}
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
                      <FormLabel>Select Employee</FormLabel>
                      <div>
                        <FormControl>
                          {/* <Input placeholder="Employee..." {...field} /> */}
                          <SelectEmployee
                            size="full"
                            selected={field.value}
                            setSelected={field.onChange}
                            disabled={!!data?.username}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Login Time</FormLabel>
                      <div>
                        <FormControl>
                          {/* <Input type="datetime-local" {...field} /> */}
                          <DateTimePicker
                            hourCycle={12}
                            value={
                              (field.value && new Date(field.value)) ||
                              undefined
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
                  name="logout"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Logout Time</FormLabel>
                      <div>
                        <FormControl>
                          {/* <Input
                            type="datetime-local"
                            placeholder="Logout Time..."
                            {...field}
                          /> */}
                          <DateTimePicker
                            hourCycle={12}
                            value={
                              (field.value && new Date(field.value)) ||
                              undefined
                            }
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={pending}>
                  {data?.id ? "Update Attendance" : "Add Attendance"}
                </Button>
              </form>
            </Form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
