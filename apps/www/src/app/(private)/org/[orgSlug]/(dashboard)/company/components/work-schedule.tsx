"use client"

import React, { Fragment, useOptimistic, useTransition } from "react"
import { deleteScheduleAction } from "@/_server/actions/schedule"
import { getWorkSchedules } from "@/_server/handlers/org"
import CompanyWorkScheduleForm from "@/forms/org/work-schedule"
import { produce } from "immer"
import { PenLine, Plus, Trash } from "lucide-react"

import { days } from "@/lib/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import EmptyPage from "@/components/pages/empty"

export default function WorkScheduleInfo({
  data,
}: {
  data: Awaited<ReturnType<typeof getWorkSchedules>>
}) {
  const [schedules, setSchedules] = useOptimistic(data)

  const [_, startTransition] = useTransition()

  const handleDelete = async (id: string | null) => {
    startTransition(() => {
      setSchedules((prev) => ({
        ...prev,
        items: prev.items.filter((p) => p.id !== id),
      }))
      id && deleteScheduleAction(id)
    })
  }

  return (
    <div className="max-w-screen-lg space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-6">
          <div className="flex-1">
            <h1 className="text-xl font-medium">Work Schedules</h1>
            <Label>List of work schedules in your company.</Label>
          </div>
          <CompanyWorkScheduleForm
            data={null}
            setData={(data) =>
              setSchedules((p) =>
                produce(p, (d) => {
                  d.items.unshift(data)
                  return d
                })
              )
            }
            trigger={
              <Button variant={"outline"}>
                <span>
                  <Plus className="size-4" />
                </span>
                <span>Add Schedule...</span>
              </Button>
            }
          />
        </div>
      </div>
      {schedules.items.length === 0 ? (
        <Card className="flex h-96 p-8">
          <EmptyPage label="No schedule found, Let's create one." />
        </Card>
      ) : (
        schedules.items.map((d, i) => (
          <Fragment key={i}>
            <Accordion
              type="single"
              defaultValue="0"
              collapsible
              className="w-full"
            >
              <AccordionItem value={i.toString()}>
                <div className="group flex w-full items-center px-4">
                  {/* <Switch className="mb-0 select-all" /> */}

                  <div className="w-full">
                    <AccordionTrigger className="pl-2">
                      {d.name}
                    </AccordionTrigger>
                  </div>
                  <div className="flex w-0 scale-0 space-x-2 overflow-hidden transition-all ease-in-out group-hover:w-auto group-hover:scale-100">
                    <CompanyWorkScheduleForm
                      data={d}
                      trigger={
                        <Button variant={"outline"} size={"icon-sm"}>
                          <PenLine className="size-4" />
                        </Button>
                      }
                      setData={(v) =>
                        setSchedules((p) => {
                          p.items[i] = v
                          return p
                        })
                      }
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"outline"} size={"icon-sm"}>
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this work schedule form your organization.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(d.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <AccordionContent className="border-t">
                  <div>
                    <div className="grid grid-cols-[200px,auto] gap-6">
                      <p className="text-muted-foreground">
                        Standard working hours/day
                      </p>
                      <p>{d.work_hrs}</p>
                      <p className="text-muted-foreground">Effective form</p>
                      <p>{d.work_hrs}</p>
                      <p className="text-muted-foreground">Schedule type</p>
                      <p>{"-"}</p>
                      <p className="text-muted-foreground">
                        Total working hours/week
                      </p>
                      <p>{d.total_hrs}</p>
                      <p className="text-muted-foreground">
                        Daily working hours
                      </p>
                      <div>
                        <ul className="space-y-2">
                          {Array(7)
                            .fill(0)
                            .map((_, i) => (
                              <li key={i} className="grid max-w-xs grid-cols-2">
                                <span>{days[i]}</span>
                                <span>{(d.daily_hrs || [])[i] || "-"}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Fragment>
        ))
      )}
    </div>
  )
}
