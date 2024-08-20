"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  modal,
  mode,
  selected,
  size = "default",
  ...props
}: CalendarProps & { modal?: boolean; size?: "lg" | "default" }) {
  return (
    <Popover modal={modal || false}>
      <PopoverTrigger asChild>
        <Button
          size={size}
          variant={"outline"}
          className={cn(
            "flex w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {mode === "range" ? (
            selected?.from ? (
              selected?.to ? (
                <>
                  {format(selected?.from, "LLL dd, y")} -{" "}
                  {format(selected?.to, "LLL dd, y")}
                </>
              ) : (
                format(selected?.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )
          ) : selected ? (
            format(new Date(selected as any), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={(mode as any) || "single"}
          selected={selected}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
