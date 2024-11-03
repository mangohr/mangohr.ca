"use client"

import { ReactNode, useState, useTransition } from "react"
import { adminAddAttendance } from "@/_server/actions/attendance"
import { queryKeys } from "@/constants/queryKeys"
import attendanceSchema from "@/schema/attendance"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { SelectEmployee } from "@/components/combobox/selectEmployee"

export default function AddAttendanceForm({ trigger }: { trigger: ReactNode }) {
  const queryClient = useQueryClient()
  const [pending, setTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof attendanceSchema.add.validate>>({
    resolver: zodResolver(attendanceSchema.add.validate),
    defaultValues: {
      employee: "",
      login: "",
      logout: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      adminAddAttendance(val).then((v) => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.attendanceList] })
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
            <DialogTitle>Attendance Form</DialogTitle>
            <DialogDescription>{"Let's add an attendance"}</DialogDescription>
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
                          <Input type="datetime-local" {...field} />
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
                          <Input
                            type="datetime-local"
                            placeholder="Logout Time..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={pending}>
                  Add Attendance
                </Button>
              </form>
            </Form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
