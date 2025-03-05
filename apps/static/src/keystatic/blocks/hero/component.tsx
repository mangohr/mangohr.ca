"use client"

import Image from "next/image"
import Link from "next/link"
import { useViewport } from "@/context/viewport"
import { ObjectField, ParsedValueForComponentSchema } from "@keystatic/core"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { heroBlock } from "."

export function HeroBlock({
  title,
  description,
  button_1,
  button_2,
}: ParsedValueForComponentSchema<ObjectField<typeof heroBlock.schema>>) {
  const { isMobile } = useViewport()
  const [t1, ...rest] = title?.split("\n")
  return (
    <section className={"container mt-10 pb-16 not-prose"}>
      <div className="bg-dark-green relative overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-20">
        <div className="">
          <Image
            src="/assets/shapes/leaves1.png"
            alt=""
            width={502}
            height={429}
            quality={90}
            className="absolute -bottom-28 -left-20"
          />
          <Image
            src="/assets/shapes/leaves1.png"
            alt=""
            width={502}
            height={429}
            quality={90}
            className="absolute -right-20 -top-28 rotate-180"
          />

          <div className="text-background relative z-10 grid items-center gap-6 lg:grid-cols-[56%,auto]">
            <div className="space-y-6 py-10 md:py-0">
              <h1 className="relative text-3xl font-medium leading-tight sm:text-6xl">
                <span className="text-primary block">{t1}</span>{" "}
                <span className="relative text-white">
                  {rest.join("\n")}
                  {""}
                  <span className="absolute -right-12 -top-24 -z-10 sm:top-0">
                    <Image
                      src="/assets/shapes/free.png"
                      alt=""
                      width={65}
                      height={65}
                      quality={90}
                    />
                  </span>
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg md:text-xl">
                {description}
                {/* We know what you’re thinking, another HR software? But I
                  promise we’re different - scroll down to see all our amazing
                  features and what sets us apart. I forgot to mention, our
                  CoreHR package is{" "}
                  <span className="text-primary">Free Forever!</span> */}
              </p>

              {!isMobile && (
                <>
                  <br />
                  <br />
                </>
              )}
              <div className="flex items-center gap-4">
                {" "}
                {button_1.label && (
                  <Link
                    href={button_1.url || ""}
                    className={cn(
                      buttonVariants({ variant: button_1.type, size: "lg" }),
                      "w-fit gap-4 rounded-full  sm:text-lg"
                    )}
                  >
                    <span>{button_1.label}</span>
                    <span className="bg-background text-foreground flex size-6 items-center justify-center rounded-full">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                )}
                {button_2.label && (
                  <Link
                    href={button_2.url || ""}
                    className={cn(
                      buttonVariants({ variant: button_2.type, size: "lg" }),
                      "w-fit gap-4 rounded-full  sm:text-lg"
                    )}
                  >
                    <span>{button_2.label}</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/assets/shapes/hero.png"
                alt=""
                width={550}
                height={500}
                quality={90}
                className="relative md:right-10"
              />
              <Image
                src="/assets/shapes/mango.png"
                alt=""
                width={214}
                height={206}
                quality={90}
                className="absolute bottom-0 right-4 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
