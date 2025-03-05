import React from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/site.config"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/custom/typography"

export default function Startup() {
  return (
    <section className="m-auto max-w-screen-xl">
      <div className="bg-primary-foreground relative z-0 grid-cols-2 overflow-hidden rounded-2xl p-4 text-white md:grid md:gap-8 md:p-24">
        <Image
          src="/assets/shapes/mango3.png"
          alt=""
          width={534}
          height={595}
          quality={90}
          className="absolute -right-1/4 top-[-20%] -z-10 md:-top-1/4 md:right-[-15%]"
        />{" "}
        <Image
          src="/assets/shapes/leaves1.png"
          alt=""
          width={502}
          height={429}
          quality={90}
          className="absolute left-[-15%] top-[65%] -z-10 -rotate-[20deg] -scale-x-100"
        />
        <div className="mt-40 space-y-8 md:mt-0 md:space-y-0">
          <Heading className="relative inline-flex">
            Are you a Startup?
            <Image
              src="/assets/shapes/tada.png"
              alt=""
              width={66}
              height={60}
              quality={90}
              className="top-1- absolute right-0 md:right-[-10%] md:top-[-70%]"
            />
          </Heading>
          <div></div>
          <p className="break-words text-lg">
            We’re serious about helping you and your business succeed, which is
            why we are committed to fair entry level pricing. Let’s have a chat
            so we can find the right package for you, even if that means it
            might not be us :)
          </p>
        </div>
        <div className="mt-12 md:mt-0">
          <div className="block w-full gap-8 space-y-8 rounded-2xl bg-[#20562C] p-6 md:flex md:space-y-0">
            <div>
              <Image
                src={"/assets/shapes/harleen.png"}
                alt=""
                width={227}
                height={183}
                quality={90}
                className="border-primary/30 w-[300px] overflow-hidden rounded-2xl border"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <Link
                href={siteConfig.contact.meeting}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full gap-4 rounded-full text-lg md:w-fit"
                )}
              >
                <span>Talk to Harleen</span>
                <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
              <p className="text-center md:text-start">
                wait, who’s Harleen? Find out more at our Company page
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
