"use client"

import { ReactNode, useTransition } from "react"
import attendanceSchema from "@/schema/attendance"
import { zodResolver } from "@hookform/resolvers/zod"
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

export default function AddAttendanceForm({ trigger }: { trigger: ReactNode }) {
  const [_, setTransition] = useTransition()

  const form = useForm<z.infer<typeof attendanceSchema.add.validate>>({
    resolver: zodResolver(attendanceSchema.add.validate),
    defaultValues: {
      employee_id: "",
      login: "",
      logout: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (val) => {
    // setOptimistic({
    //   ...val,
    //   id: val.id || idGenerate(),
    //   created_at: new Date(),
    // })
    // setTransition(() => {
    //   if (!val.id) {
    //     form.reset({ id: undefined, name: "" })
    //   }
    //   updateDepartmentAction(val)
    // })
  })

  return (
    <>
      <Dialog>
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
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Select Employee</FormLabel>
                      <div>
                        <FormControl>
                          <Input placeholder="Employee..." {...field} />
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
                          <Input type="datetime" {...field} />
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
                            type="datetime"
                            placeholder="Logout Time..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Attendance</Button>
              </form>
            </Form>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  )
}
