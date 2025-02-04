import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Head } from "@/components/custom/typography"
import PricingCards from "@/components/pricing/card"

export default function Pricing() {
  return (
    <>
      <Head
        name="Flexible Pricing"
        label="Packages"
        desc="Built with SMBs in mind. Our CoreHR package will be free forever - yes you read that right - free forever! Only pay for what you need and for the employees you have. Truly flexible pricing."
      />
      <PricingCards />
      <br />
      <br />
      <div className="space-y-2">
        <div className="text-center">
          Not seeing a module you need? Chat to us about our add-on modules
        </div>
        <div className="text-center">
          <Link
            href={""}
            className="text-dark-green inline-flex items-center justify-center space-x-2  font-semibold md:text-lg"
          >
            <span>Contact Us</span>
            <span className="bg-dark-green flex size-4 items-center justify-center rounded-full md:size-7">
              <ArrowUpRight className="size-3 stroke-white md:size-5" />
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}
