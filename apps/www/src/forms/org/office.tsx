"use client"

import React, { ReactElement, useEffect, useState, useTransition } from "react"
import { updateOfficeAction } from "@/_server/actions/office"
import { getOffices } from "@/_server/handlers/org"
import officeSchema from "@/schema/office"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { idGenerate } from "@/lib/idGenerate"
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
import { Input } from "@/components/ui/input"

export function OfficeForm() {
  const form = useFormContext()
  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Office Name</FormLabel>
            <FormControl>
              <Input placeholder="Mango HR" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Office Location</FormLabel>
            <FormControl>
              <Input placeholder="Canada" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="support@mangohr.ca" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="support@mangohr.ca" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export function CompanyOfficeForm<
  T extends Awaited<ReturnType<typeof getOffices>>["items"][0],
>({
  data,
  trigger,
  setData,
}: {
  data: T | null
  trigger: ReactElement
  setData: (val: T) => void
}) {
  const [open, setOpen] = useState(false)
  const schema =
    (data && officeSchema.update.validate) || officeSchema.create.validate

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      active: true,
    },
  })

  useEffect(() => {
    form.reset((data as any) || {})
  }, [open])

  const [isPending, startTransition] = useTransition()
  const onSubmit = form.handleSubmit((val) => {
    setOpen(false)
    startTransition(() => {
      setData({
        active: val.active,
        email: val.email,
        id: data?.id || idGenerate(),
        location: val.location,
        name: val.name,
        phone: val.phone,
      } as any)
      updateOfficeAction(val)
    })
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent disabled={isPending} className="max-w-screen-md">
        <DialogHeader className="grid grid-cols-[auto,200px]">
          <DialogTitle>Office Info</DialogTitle>
          <div className="relative flex justify-end"></div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogBody>
              <OfficeForm />
            </DialogBody>
            <DialogFooter className="flex justify-end">
              <Button disabled={isPending}>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
