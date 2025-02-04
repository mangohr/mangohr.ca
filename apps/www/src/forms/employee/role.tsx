"use client"

import React, { ReactNode, useEffect, useState, useTransition } from "react"
import { updateEmployeeRole } from "@/_server/actions/employee"
import { getAllEmployeesRoles } from "@/_server/handlers/employee"
import { roles } from "@/constants/roles"
import employeeSchema from "@/schema/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EmployeeRoleForm<
  T extends Awaited<ReturnType<typeof getAllEmployeesRoles>>["items"][0],
>({
  data,
  setData,
  trigger,
}: {
  data: T
  setData: (val: T) => void
  trigger: ReactNode
}) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof employeeSchema.role.edit.validate>>({
    resolver: zodResolver(employeeSchema.role.edit.validate),
    defaultValues: {
      roles: [],
    },
  })

  const [isPending, startTransition] = useTransition()
  const onSubmit = form.handleSubmit(async (formData) => {
    setOpen(false)
    startTransition(() => {
      setData({ ...data, ...formData })
      updateEmployeeRole({ formData, username: data.username })
    })
  })

  useEffect(() => {
    return form.reset({ roles: data.roles || [] })
  }, [data])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-screen-md" disabled={isPending}>
        <DialogHeader className="grid grid-cols-[auto,200px]">
          <DialogTitle>Edit Employee Role</DialogTitle>
          <div className="relative flex justify-end"></div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogBody className="flex w-full flex-col gap-6">
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Select Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="space-y-1 pt-2"
                        onValueChange={(v) => field.onChange([v])}
                        defaultValue={data.roles[0] || ""}
                      >
                        {(Object.keys(roles) as Array<keyof typeof roles>).map(
                          (r, i) => (
                            <Label key={i} className="relative block w-full">
                              <div className="[&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:ring-primary flex items-center  space-x-2 rounded-md border p-2 ring-1 ring-transparent">
                                <RadioGroupItem value={r} />
                                <div className="w-full space-y-1 text-start font-normal">
                                  <p className="font-medium">
                                    {roles[r].label}
                                  </p>
                                  <p className=""> {roles[r].description}</p>
                                </div>
                              </div>
                            </Label>
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogBody>
            <DialogFooter className="flex justify-end ">
              <Button disabled={isPending}>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
