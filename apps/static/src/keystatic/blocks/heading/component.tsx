"use client"

import { ObjectField, ParsedValueForComponentSchema } from "@keystatic/core"

import { cn } from "@/lib/utils"

import { headingBlock } from "."

export function HeadingBlock({
  label,
  title,
  description,
}: ParsedValueForComponentSchema<ObjectField<typeof headingBlock.schema>>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4 text-center pt-10 pb-8 not-prose"
      )}
    >
      {label && (
        <p className="text-green text-xs font-semibold md:text-base">
          {label.toUpperCase()}
        </p>
      )}
      {title && (
        <h2 className="max-w-xl text-3xl font-medium leading-tight md:text-5xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-xl text-base md:text-lg">{description}</p>
      )}
    </div>
  )
}
