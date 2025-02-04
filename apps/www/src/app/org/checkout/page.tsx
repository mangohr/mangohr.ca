"use client"

import React, { useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import { plans as p } from "@/constants/plans"
import { Plus } from "lucide-react"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"

import { rpcClient } from "@/lib/honoClient"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SelectOrgs } from "@/components/combobox/selectOrg"
import SideLayout from "@/components/custom/layouts/sideLayout"

const Page = () => {
  const [orgSlug, setOrgSlug] = useQueryState("slug", parseAsString)
  const [priceId, setPriceId] = useQueryState("price", parseAsString)
  const [units, setUnit] = useQueryState("units", parseAsInteger)
  const [pending, trans] = useTransition()
  const router = useRouter()
  const plans = p.filter((a) => a.stripe.price_id)

  const currplan = useMemo(() => {
    return p.find((e) => e.stripe.price_id === priceId)
  }, [priceId, units])

  const handleSubscribe = async () => {
    trans(() => {
      rpcClient.api.stripe.checkout
        .$post({
          json: {
            units: units || 1,
            price_id: currplan?.stripe.price_id!,
            org_slug: orgSlug!,
          },
        })
        .then(async (r) => {
          const result = await r.json()
          if (!result) return
          router.push(result)
        })
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
            <Dialog>
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
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
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
              className="grid grid-cols-2 gap-4"
              onValueChange={(e) => setPriceId(e || null)}
            >
              {plans.map((a, i) => (
                <div key={i} className="flex items-center">
                  <RadioGroupItem
                    value={a.stripe.price_id!}
                    id={a.stripe.price_id!}
                    className="border-primary text-primary focus-visible:ring-ring peer sr-only aspect-square size-4 w-full rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Label
                    htmlFor={a.stripe.price_id!}
                    className="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex w-full cursor-pointer flex-col items-center justify-between rounded-md border-2 bg-transparent p-4"
                  >
                    {a.title}
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
              onChange={(e) => setUnit(parseInt(e.target.value) || null)}
            />
          </div>
          <div className="grid-cols-[100px,auto] grid items-center">
            <Label className="block">Total Amount</Label>
            <p className="text-2xl font-semibold text-end">
              {formatAmount(
                "cad",
                (currplan?.monthly_amounts.cad || 0) * (units || 1)
              )}
            </p>
          </div>
          <Button
            size={"lg"}
            className="w-full"
            onClick={() => handleSubscribe()}
            disabled={pending}
          >
            Proceed to Pay
          </Button>
        </div>
      </SideLayout>
    </div>
  )
}

export default Page
