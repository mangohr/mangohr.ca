import { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Head({
  label,
  name,
  desc,
  className,
}: {
  label?: string
  name: string
  desc?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col items-center justify-center space-y-4 text-center",
        className
      )}
    >
      {label && (
        <p className="text-green text-xs font-semibold md:text-base">
          {label.toUpperCase()}
        </p>
      )}
      <h2 className="max-w-xl text-3xl font-medium leading-tight md:text-5xl">
        {name}
      </h2>
      {desc && <p className="max-w-xl text-base md:text-lg">{desc}</p>}
    </div>
  )
}

export function Heading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn("max-w-xl text-5xl font-medium leading-tight", className)}
    >
      {children}
    </h2>
  )
}

export function SubHeading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn("max-w-xl text-3xl font-medium leading-tight", className)}
    >
      {children}
    </h2>
  )
}
export function HeadingLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn("max-w-xl text-5xl font-medium leading-tight", className)}
    >
      {children}
    </h2>
  )
}
