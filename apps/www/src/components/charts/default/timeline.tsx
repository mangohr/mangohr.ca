import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  eachDayOfInterval,
  endOfYear,
  startOfYear,
  format,
  getYear,
  subYears,
} from "date-fns";
import React from "react";
import { number } from "zod";

const Timeline = () => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const today = new Date();

  const dates = eachDayOfInterval({
    start: startOfYear(today),
    end: endOfYear(today),
  });

  const rands = [...Array(150)].map((_, i) =>
    Math.floor(Math.random() * (365 - 0 + 1) + 0)
  );

  const legends = [
    { color: "bg-muted", min: 0, max: undefined },
    { color: "bg-primary/20", min: 0, max: 5 },
    { color: "bg-primary/40", min: 5, max: 20 },
    { color: "bg-primary/70", min: 20, max: 50 },
    { color: "bg-primary", min: 50, max: -1 },
  ];

  return (
    <div className="bg-background rounded-md border">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full items-center justify-between gap-6 p-4">
          <div className="flex flex-col justify-between gap-2">
            <div>
              <p className="text-2xl font-medium leading-none">400</p>
              <Label className="font-light">Time-offs this year</Label>
            </div>
            <Separator />
            <div className="space-y-1">
              {[...legends].reverse().map((l, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className={cn("size-3 rounded shadow-sm", l.color)} />
                  <Label className="text-xs font-light">
                    {l.min}
                    {l.max === -1 ? "+" : l.max ? ` - ${l.max}` : ""}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 grid grid-cols-[repeat(12,1fr)] items-center justify-center text-center">
              {months.map((d, o) => (
                <p
                  key={d}
                  className="text-muted-foreground h-5 text-center text-[0.6rem] font-medium capitalize"
                >
                  {d.substring(0, 3)}
                </p>
              ))}
            </div>
            <div className="flex">
              <div className="grid grid-rows-7 items-center justify-center align-middle">
                {days.map((d, i) => (
                  <p
                    key={d}
                    className="text-muted-foreground w-7 text-[0.6rem]  font-medium capitalize leading-normal"
                  >
                    {(1 & i && d.substring(0, 3)) || ""}
                  </p>
                ))}
              </div>
              <div className="grid w-full grid-flow-col grid-rows-[repeat(7,1fr)]">
                {dates.map((d, i) => {
                  const val = Math.floor(Math.random() * (100 - 0 + 1) + 0);
                  let color = legends[0].color;
                  for (const l of legends) {
                    if (
                      l.min === 0 &&
                      typeof l.max === undefined &&
                      l.min === val
                    ) {
                      break;
                    }
                    if (l.max === -1 && l.min > 0 && val > l.min) {
                      color = l.color;
                      break;
                    }

                    if (
                      typeof l.min === "number" &&
                      l.max &&
                      val > l.min &&
                      val <= l.max
                    ) {
                      color = l.color;
                      break;
                    }
                  }
                  return (
                    <TooltipProvider key={i} delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            key={i}
                            className={cn(
                              "bg-muted m-0.5 block size-3 rounded",
                              rands.includes(i) && color
                            )}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <p>
                              {(rands.includes(i) && val) || 0} Time-offs <br />{" "}
                              on {format(d, "PP")}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex max-w-48 flex-1 flex-col justify-center gap-1">
            <Button variant={"secondary"} size={"sm"} className="w-full">
              {getYear(today)}
            </Button>
            <Button variant={"ghost"} size={"sm"} className="w-full">
              {getYear(subYears(today, 1))}
            </Button>
            <Button variant={"ghost"} size={"sm"} className="w-full">
              {getYear(subYears(today, 2))}
            </Button>
            <Button variant={"ghost"} size={"sm"} className="w-full">
              {getYear(subYears(today, 3))}
            </Button>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Timeline;
