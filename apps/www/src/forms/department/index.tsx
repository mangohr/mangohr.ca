"use client"

import React, { useEffect, useTransition } from "react"
import { updateDepartmentAction } from "@/_server/actions/departments"
import { getDepartments } from "@/_server/handlers/org"
import departmentSchema from "@/schema/department"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { idGenerate } from "@/lib/idGenerate"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function DepartmentForm({
  data,
  setOptimistic,
}: {
  data: Awaited<ReturnType<typeof getDepartments>>["items"][0] | null
  setOptimistic: (
    val: Awaited<ReturnType<typeof getDepartments>>["items"][0]
  ) => void
}) {
  const [_, setTransition] = useTransition()

  const form = useForm<z.infer<typeof departmentSchema.edit.validate>>({
    resolver: zodResolver(departmentSchema.edit.validate),
    defaultValues: {
      id: undefined,
      name: "",
    },
  })
  useEffect(() => {
    data && form.reset(data)
  }, [data])

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      setOptimistic({
        ...val,
        id: val.id || idGenerate(),
        created_at: new Date(),
      })
      if (!val.id) {
        form.reset({ id: undefined, name: "" })
      }
      updateDepartmentAction(val)
    })
  })

  return (
    <Form {...form}>
      <form id={data?.id || "new-department"} onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              {/* <FormLabel>Name of department?</FormLabel> */}
              <div>
                <FormControl>
                  <Input placeholder="Add department name..." {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
