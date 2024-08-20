"use client"

import React, { useTransition } from "react"
import { createOrgAction } from "@/_server/actions/org"
import orgSchema from "@/schema/org"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Loader2, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function NewOrgForm() {
  const [pending, setTransition] = useTransition()

  const form = useForm<z.infer<typeof orgSchema.create.validate>>({
    resolver: zodResolver(orgSchema.create.validate),
    defaultValues: {
      name: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (val) => {
    setTransition(() => {
      createOrgAction(val)
    })
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus />
          <span>Create Company</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    {/* <FormLabel>Name of department?</FormLabel> */}
                    <div>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 /> <span>Creating...</span>
                  </>
                ) : (
                  "Create Company"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
