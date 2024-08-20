"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex gap-5", className)}
      {...props}
      ref={ref}
    />
  )
})
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  {
    icon?: React.ReactNode
    label: string
  } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, icon, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "2 rounded-md border p-4 text-center focus:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-center space-y-2">
        {icon && <div className="self-center">{icon}</div>}
        <div className="text-sm">{label}</div>
      </div>
    </RadioGroupPrimitive.Item>
  )
})
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { ButtonGroup, ButtonGroupItem }
