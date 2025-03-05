"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/site.config"
import { ObjectField, ParsedValueForComponentSchema } from "@keystatic/core"
import { ArrowUpRight, Check, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Head, SubHeading } from "@/components/custom/typography"

import { demoVideoBlock } from "."

export function DemoVideoBlock({}: ParsedValueForComponentSchema<
  ObjectField<typeof demoVideoBlock.schema>
>) {
  return (
    <div className="grid gap-6 md:grid-cols-2 container py-16 not-prose">
      <div className="bg-primary space-y-6 rounded-2xl p-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            fill
            alt=""
            src={"/assets/shapes/demo-thumb.png"}
            className="aspect-video object-cover"
            quality={80}
          />
          <div className="from-primary absolute bottom-0 left-0 block h-24 w-full bg-gradient-to-t" />
        </div>
        <SubHeading className="text-white">In app Demo</SubHeading>
        <a className="flex items-center gap-2 font-semibold text-white">
          <span className="flex size-8 items-center justify-center rounded-full bg-white">
            <Play className="fill-black" />
          </span>
          Watch Video
        </a>
      </div>
      <div className="flex flex-col justify-center md:p-8">
        <Head
          name="See It in Action"
          label={"Demo Video"}
          desc="Manage all essential information, in one secure location. Our system ensures that you can easily update and retrieve records, maintaining accuracy and compliance with Canadian regulations."
          className="items-start text-start"
        />
        <Link
          href={siteConfig.contact.meeting}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "gap-4 rounded-full text-lg"
          )}
        >
          <span>Book a call</span>
          <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  )
}
