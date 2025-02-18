import React, { Fragment } from "react"
import Link from "next/link"
import { useViewport } from "@/context/viewport"
import {
  GetStripeProductsResult,
  StripeProduct,
} from "@/features/stripe/server.actions"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { buttonVariants } from "../ui/button"

function PricingCard({ data }: { data: StripeProduct }) {
  const { isMobile } = useViewport()

  const btn = (
    <Link
      className={cn(
        buttonVariants({
          size: "lg",
          variant: data.highlight ? "white" : "outline",
        }),
        "w-full items-center justify-center rounded-full text-center md:text-lg",
        !data.highlight && "border-foreground"
      )}
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
      href={"/subscribe?price=" + data.price.id}
    >
      {data.price.unit_amount === 0 ? "Join now" : "Buy Now"}
    </Link>
  )
  return (
    <div
      className={cn(
        "border-primary/30 space-y-1 rounded-lg border p-4 md:space-y-4",
        data.highlight && "bg-gradient-to-b from-[#F9B459] to-[#F2F7F4]"
      )}
    >
      <h2 className="text-xl font-semibold md:text-2xl">{data.name}</h2>
      <p>{data.description}</p>
      <h1>
        <span className="text-3xl font-semibold md:text-5xl">
          {" "}
          ${data.price.unit_amount}
        </span>
        <span>/ {data.price.recurring?.interval} / User</span>
      </h1>

      {!isMobile && btn}

      <div className="space-y-2 py-8 md:py-0">
        <h3 className="font-semibold md:text-lg">Features</h3>
        <div className="grid grid-cols-[20px,auto] items-center gap-2 text-sm md:text-base">
          {data.features.map((f, i) => (
            <Fragment key={i}>
              <span>
                <Check className="stroke-green size-4" />
              </span>
              <span>{f}</span>
            </Fragment>
          ))}
        </div>
      </div>
      {isMobile && btn}
    </div>
  )
}

export const PricingCards = ({
  plans,
  isLoading,
}: {
  plans: GetStripeProductsResult | undefined
  isLoading: boolean
}) => {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {[...(plans || Array(3))].map((p, i) =>
        !isLoading ? (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <PricingCard key={i} data={p} />
          </motion.div>
        ) : (
          <Skeleton key={i} className="h-96 rounded-md border"></Skeleton>
        )
      )}
    </div>
  )
}

export default PricingCards
