import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:w-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:opacity-85",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "text-foreground hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        black: "bg-foreground text-background hover:bg-foreground/80 shadow-sm",
        "white-outline":
          "text-background border-background hover:bg-foreground/80 border bg-transparent shadow-sm",
        white:
          "text-foreground hover:bg-foreground hover:text-background bg-background border-transparent shadow-sm",

        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-current",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-14 rounded-md px-8",
        icon: "size-9",
        "icon-sm": "size-8 [&>svg]:w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
