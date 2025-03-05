"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const expandIco = {
  default: (
    <ChevronDownIcon className="chevron text-muted-foreground size-4 shrink-0 transition-transform duration-200" />
  ),
  plus: (
    <div className="bg-background relative flex size-6 items-center justify-center rounded-full">
      <span className="bg-foreground absolute inset-auto block h-0.5 w-4" />
      <span className="bg-foreground rotate-line ease absolute  inset-auto block h-4 w-0.5 opacity-100 transition-all duration-150" />
    </div>
  ),
}

const accordionVariants = cva(
  "flex flex-1 items-center justify-between rounded-md py-4 pl-6 pr-4 transition-all hover:underline",
  {
    variants: {
      variant: {
        default: "text-base",
        fancy: "text-background rounded-full bg-[#14391C] text-sm md:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("my-4", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    VariantProps<typeof accordionVariants> & { expand?: "plus" | "default" }
>(({ className, children, variant, expand = "default", ...props }, ref) => (
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        accordionVariants({ variant }),
        className,
        expand === "plus"
          ? "[&[data-state=open]_.rotate-line]:opacity-0"
          : "[&[data-state=open]_.chevron]:rotate-180"
      )}
      {...props}
    >
      <span className="flex-1 text-start"> {children}</span>
      {expandIco[expand]}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
    {...props}
  >
    <div className={cn("px-4 py-8", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
