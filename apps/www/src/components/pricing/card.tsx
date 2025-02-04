import React, { Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { plans } from "@/constants/plans"
import { useViewport } from "@/context/viewport"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

function Card({ data }: { data: (typeof plans)[0] }) {
  const router = useRouter()
  const { isMobile } = useViewport()

  const btn = (
    <Link
      className={cn(
        buttonVariants({
          size: "lg",
          variant: data.highlight ? "white" : "outline",
        }),
        "w-full rounded-full md:text-lg items-center justify-center text-center",
        !data.highlight && "border-foreground"
      )}
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
      href={
        data.stripe.price_id
          ? "/org/checkout?price=" + data.stripe.price_id
          : "/org"
      }
    >
      {data.button_name}
    </Link>
  )
  return (
    <div
      className={cn(
        "border-primary/30 space-y-1 rounded-lg border p-4 md:space-y-4",
        data.highlight && "bg-gradient-to-b from-[#F9B459] to-[#F2F7F4]"
      )}
    >
      <h2 className="text-xl font-semibold md:text-2xl">{data.title}</h2>
      <p>{data.desc}</p>
      <h1>
        <span className="text-3xl font-semibold md:text-5xl">
          {" "}
          ${data.monthly_amounts.cad}
        </span>{" "}
        <span>/ Month / User</span>
      </h1>

      {!isMobile && btn}

      <div className="space-y-2 py-8 md:py-0">
        <h3 className="font-semibold md:text-lg">Features</h3>
        <div className="grid grid-cols-[20px,auto] items-center gap-2 text-sm md:text-base">
          {data.features.map((f, i) => (
            <Fragment key={i}>
              <span>
                {f.check ? (
                  <Check className="stroke-green size-4" />
                ) : (
                  <X className="size-4" />
                )}
              </span>
              <span>{f.label}</span>
            </Fragment>
          ))}
        </div>
      </div>
      {isMobile && btn}
    </div>
  )
}

export const PricingCards = () => {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {plans.map((p, i) => (
        <Card key={i} data={p} />
      ))}
    </div>
  )
}

export default PricingCards
