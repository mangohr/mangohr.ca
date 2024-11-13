import React, { Fragment } from "react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

const plans = [
  {
    title: "CoreHR",
    desc: "Our free tier provides you",
    highlight: false,

    monthly_amounts: {
      cad: 0,
    },
    yearly_amount: {
      cad: 0,
    },
    button_name: "Join Now",
    features: [
      { label: "Employee Management", check: true },
      { label: "Document Management", check: true },
      { label: "Audit Trail", check: true },
      { label: "Up to 15 users", check: true },
      { label: "Role based access", check: true },
      { label: "Up to 3GB in storage", check: true },
      { label: "Dedicated email support", check: true },
    ],
  },
  {
    title: "Essentials",
    desc: "Our free tier provides you",
    highlight: true,
    monthly_amounts: {
      cad: 6,
    },
    yearly_amount: {
      cad: 6,
    },
    button_name: "Coming Soon",
    features: [
      { label: "Employee Management", check: true },
      { label: "Document Management", check: true },
      { label: "Audit Trail", check: true },
      { label: "Up to 15 users", check: true },
      { label: "Role based access", check: true },
      { label: "Up to 3GB in storage", check: true },
      { label: "Dedicated email support", check: true },
    ],
  },
  {
    title: "Premium",
    desc: "Our free tier provides you",
    highlight: false,

    monthly_amounts: {
      cad: 8,
    },
    yearly_amount: {
      cad: 8,
    },
    button_name: "Coming Soon",
    features: [
      { label: "Employee Management", check: true },
      { label: "Document Management", check: true },
      { label: "Audit Trail", check: true },
      { label: "Up to 15 users", check: true },
      { label: "Role based access", check: true },
      { label: "Up to 3GB in storage", check: true },
      { label: "Dedicated email support", check: true },
    ],
  },
]

function Card({ data }: { data: (typeof plans)[0] }) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-lg border p-4",
        data.highlight &&
          "bg-gradient-to-b from-[#91E0B3] via-[#E9E293] to-[#FF8A03]"
      )}
    >
      <h2 className="text-2xl font-semibold">{data.title}</h2>
      <p>{data.desc}</p>
      <h1>
        <span className="text-5xl font-semibold">
          {" "}
          ${data.monthly_amounts.cad}
        </span>{" "}
        <span>/ Month / User</span>
      </h1>

      <Button
        className={cn(
          "block w-full rounded-full text-lg",
          !data.highlight && "border-foreground"
        )}
        size={"lg"}
        variant={data.highlight ? "white" : "outline"}
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        {data.button_name}
      </Button>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Features</h3>
        <div className="grid grid-cols-[20px,auto] items-center gap-2">
          {data.features.map((f, i) => (
            <Fragment key={i}>
              <span>
                {f.check ? (
                  <Check className="stroke-light-green size-4" />
                ) : (
                  <X className="size-4" />
                )}
              </span>
              <span>{f.label}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export const PricingCards = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
      {plans.map((p, i) => (
        <Card key={i} data={p} />
      ))}
    </div>
  )
}

export default PricingCards
