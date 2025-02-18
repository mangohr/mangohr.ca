"use client"

import React, { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createOrgAction } from "@/_server/actions/org"
import { stripeSchema } from "@/features/stripe/schema"
import {
  createCheckoutSession,
  GetStripeProductsResult,
} from "@/features/stripe/server.actions"
import orgSchema from "@/schema/org"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { formatAmount } from "@/lib/intl"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SelectOrgs } from "@/components/combobox/selectOrg"
import SideLayout from "@/components/custom/layouts/sideLayout"

const PageClient = ({ plans }: { plans: GetStripeProductsResult }) => {
  const [orgSlug, setOrgSlug] = useQueryState("slug", parseAsString)
  const [priceId, setPriceId] = useQueryState("price", parseAsString)
  const [units, setUnit] = useQueryState("units", parseAsInteger)
  const [pending, trans] = useTransition()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const currplan = useMemo(() => {
    const plan = plans.find((f) => f.price.id === priceId)
    if (plan?.price.unit_amount === 0) {
      setUnit(1)
    }
    return plan
  }, [priceId])

  const handleSubscribe = async () => {
    trans(async () => {
      try {
        const data = { price_id: priceId, units, org_slug: orgSlug }
        await stripeSchema.createSubscribe.validate
          .parseAsync(data)
          .then(async (p) => await createCheckoutSession(p))
      } catch (e: any) {
        toast.error(e.message || "Failed to subscribe")
      }
    })
  }

  const form = useForm<z.infer<typeof orgSchema.create.validate.shape.general>>(
    {
      resolver: zodResolver(orgSchema.create.validate.shape.general),
      defaultValues: {
        name: "",
        email: "",
      },
    }
  )

  function onSubmit(
    data: z.infer<typeof orgSchema.create.validate.shape.general>
  ) {
    trans(() => {
      createOrgAction({ general: data }, true)
    })
  }

  return (
    <div>
      <SideLayout
        title="Checkout"
        tag={"Choose your plan"}
        // description="You have been invited to join company."
      >
        <div className="m-auto w-full max-w-md space-y-5 border p-8">
          <div>
            <Label className="mb-3 block">Select Organization</Label>
            <SelectOrgs
              size="lg"
              selected={orgSlug || undefined}
              setSelected={(val) => setOrgSlug(val || null)}
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "mt-4"
                )}
              >
                <>
                  <Plus />
                  <span>Create New Organization</span>
                </>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Organization</DialogTitle>
                  <DialogDescription className="mb-10">
                    Lets create a new organization.
                  </DialogDescription>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Organization Name</FormLabel>

                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Work Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Create
                      </Button>
                    </form>
                  </Form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Label htmlFor="option-one" className="mb-3 block">
              Select Plan
            </Label>

            <RadioGroup
              defaultValue={priceId || undefined}
              className="grid gap-4"
              onValueChange={(e) => setPriceId(e || null)}
            >
              {plans.map((a, i) => (
                <div key={i} className="flex items-center">
                  <RadioGroupItem
                    value={a.price.id!}
                    id={a.price.id!}
                    className="border-primary text-primary focus-visible:ring-ring peer sr-only aspect-square size-4 w-full rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Label
                    htmlFor={a.price.id!}
                    className="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex w-full cursor-pointer items-center justify-between rounded-md border-2 bg-transparent p-4"
                  >
                    <span> {a.name}</span>
                    <span>
                      {a.price.unit_amount === 0 ? (
                        "Free"
                      ) : (
                        <>
                          {formatAmount(
                            a?.price.currency!,
                            (a?.price.unit_amount || 0) / 100,
                            { fractionDigits: 2 }
                          )}{" "}
                          / {a.price.recurring?.interval} / user
                        </>
                      )}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label className="mb-3 block">Total Employee Seats</Label>
            <Input
              size="lg"
              type="number"
              defaultValue={units || 1}
              min={1}
              disabled={currplan?.price.unit_amount === 0}
              onChange={(e) => setUnit(parseInt(e.target.value) || null)}
            />
          </div>
          <div className="grid grid-cols-[100px,auto] items-center">
            <Label className="block">Total Amount</Label>
            <p className="text-end text-2xl font-semibold">
              {currplan?.price.unit_amount === 0 ? (
                "Free"
              ) : (
                <>
                  {formatAmount(
                    currplan?.price.currency!,
                    ((currplan?.price.unit_amount || 0) / 100) * (units || 1),
                    { fractionDigits: 2 }
                  )}
                </>
              )}
            </p>
          </div>
          <Button
            size={"lg"}
            className="w-full"
            onClick={() => handleSubscribe()}
            disabled={pending}
          >
            {currplan?.price.unit_amount === 0 ? "Subscribe" : "Proceed to Pay"}
          </Button>
        </div>
      </SideLayout>
    </div>
  )
}

export default PageClient
