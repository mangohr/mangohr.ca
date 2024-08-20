"use client"

import React, { ReactNode, useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"
import { updateEmployeeRole } from "@/_server/actions/employee"
import { getAllEmployeesRoles } from "@/_server/handlers/employee"
import { roles } from "@/constants/roles"
import { scopes } from "@/constants/scopes"
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
import { MultiSelect } from "@/components/ui/multiselect"
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
      role: "",
      scopes: [],
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
    return form.reset({ role: data.role || "", scopes: data.scopes || [] })
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
                name="role"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Select Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="space-y-1 pt-2"
                        onValueChange={field.onChange}
                        defaultValue={data.role || ""}
                      >
                        {(Object.keys(roles) as Array<keyof typeof roles>).map(
                          (r, i) => (
                            <Label key={i} className="relative block w-full">
                              <div className="flex items-center space-x-2 rounded-md  border p-2 ring-1 ring-transparent [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:ring-primary">
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
              <FormField
                control={form.control}
                name="scopes"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Assign Custom Scopes</FormLabel>
                    <FormControl>
                      <MultiSelect
                        modalPopover
                        options={scopes.map((s) => ({
                          value: s.id,
                          label: s.id.split(":").join(" "),
                          description: s.label,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={[]}
                      />
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
