"use client"

import { useTransition } from "react"
import { approveTimeOff } from "@/_server/actions/timeoff"
import { queryKeys } from "@/constants/queryKeys"
import { timeoffSchema } from "@/schema/timeoff"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export default function ApproveTimeOffForm({
  employee,
  request,
  onSuccess,
}: {
  employee: string
  request: string
  onSuccess: (v: Awaited<ReturnType<typeof approveTimeOff>>) => void
}) {
  const queryClient = useQueryClient()
  const [pending, setTransition] = useTransition()
  const form = useForm<z.infer<typeof timeoffSchema.approve.validate>>({
    resolver: zodResolver(timeoffSchema.approve.validate),
    defaultValues: {
      action: "rejected",
      message: "",
      employee,
      request,
    },
  })

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      approveTimeOff(val).then((v) => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.timeoffList] })
        form.reset()
        onSuccess(v)
      })
    })
  })

  return (
    <>
      <Form {...form}>
        <form
          id={"new-attendance"}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Write a message to employee</FormLabel>
                <div>
                  <FormControl>
                    <Textarea
                      placeholder="Write message / reason based on the action taken."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={pending}
              onClick={() => form.setValue("action", "approved")}
            >
              Approve Request
            </Button>
            <Button
              type="submit"
              variant={"outline"}
              disabled={pending}
              onClick={() => form.setValue("action", "rejected")}
            >
              Reject Request
            </Button>
          </div>
        </form>
      </Form>{" "}
    </>
  )
}
