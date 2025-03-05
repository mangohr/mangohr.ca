"use client"

import React, { Fragment } from "react"
import Image from "next/image"
import { useViewport } from "@/context/viewport"
import { ObjectField, ParsedValueForComponentSchema } from "@keystatic/core"

import { cn } from "@/lib/utils"
import { Head } from "@/components/custom/typography"

import { whyUsBlock } from "."

const data = [
  {
    title: "Free",
    desc: "We want you to enjoy our platform fully which is why we offer our CoreHR for free. How? We don’t have any investors :( but what that means is we get to set our own pricing and move at our own pace, whether you purchase one of our add-on packages or just use the free platform forever - we are glad to have you",
  },
  {
    title: "Support",
    desc: "Coming from a background in Customer Success, we are committed to providing world class support. Every package receives 24/7 support for priority issues, and each of you will be assigned a customer success manager who will ensure mangoHR is the product for you.",
  },
  {
    title: "Flexible Pricing",
    desc: "We want to see Canadian SMBs succeed, which is why  we believe you should be able to try our services wholeheartedly without any commitment. If you would like to purchase add-on packages these are priced individually or as a bundle so that you only pay for what you need!",
  },
  {
    title: "Canadian",
    desc: "We’re a proudly Canadian company that gets what small businesses need. Our tools make it simple to manage your team and handle HR without the hassle.",
  },
]

export function WhyUsBlock({}: ParsedValueForComponentSchema<
  ObjectField<typeof whyUsBlock.schema>
>) {
  const { isMobile } = useViewport()
  return (
    <div className="bg-light-green py-16 not-prose">
      <div className="container">
        <Head
          name="Why Us"
          //   label="Eyebrow"
          //   desc="MangoHR takes data privacy seriously, and abides by Canadian law. See below how we protect your company’s and employee’s data."
          className={cn(isMobile && "mb-0")}
        />
        <div className="relative">
          <span className="via-green absolute left-[7px] block h-full w-0.5 bg-gradient-to-b from-transparent to-transparent md:left-[49.92%]" />
          <br /> <br /> <br />
          <div className="grid gap-y-12 md:grid-cols-[43%,auto,43%]">
            {data.map((e, i) => {
              const odd = i & 1
              const comp = (
                <div
                  className={cn(
                    "bg-background border-green/10 flex flex-col space-y-2 rounded-xl border p-6",
                    "text-start"
                  )}
                >
                  <h3 className="mb-2 text-2xl font-medium md:text-4xl">
                    {e.title}
                  </h3>
                  <p className="max-w-lg text-sm md:text-base">{e.desc}</p>
                </div>
              )

              const img = (
                <div className="flex items-center justify-center">
                  <Image
                    src={`/assets/why-us/why-us-${i + 1}.png`}
                    alt=""
                    width={300}
                    height={300}
                  />
                </div>
              )

              if (isMobile) {
                return (
                  <div key={i} className="flex">
                    <div className="w-10">
                      <span className="bg-green mt-8 block size-4 rounded-full" />
                    </div>
                    <div className="flex-1">{comp}</div>
                  </div>
                )
              }

              return (
                <Fragment key={i}>
                  {odd ? comp : img}
                  <div className="flex items-start justify-center">
                    <span className="bg-green block size-4 rounded-full" />
                  </div>
                  {!odd ? comp : img}
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
