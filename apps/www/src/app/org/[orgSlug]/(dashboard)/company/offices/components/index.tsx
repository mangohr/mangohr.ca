"use client"

import React, { useOptimistic, useTransition } from "react"
import { deleteOfficeAction } from "@/_server/actions/office"
import { getOffices } from "@/_server/handlers/org"
import { CompanyOfficeForm } from "@/forms/org/office"
import { produce } from "immer"
import { PenLine, Plus, Trash } from "lucide-react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import EmptyPage from "@/components/pages/empty"

export default function OfficePage({
  data,
}: {
  data: Awaited<ReturnType<typeof getOffices>>
}) {
  const [offices, setOffices] = useOptimistic(data)

  const [_, startTransition] = useTransition()

  const handleDelete = async (id: string | null) => {
    startTransition(() => {
      setOffices((prev) => ({
        ...prev,
        items: prev.items.filter((p) => p.id !== id),
      }))
      id && deleteOfficeAction(id)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Offices</h1>
          <Label>List of offices in your company.</Label>
        </div>

        <CompanyOfficeForm
          data={null}
          setData={(val) =>
            setOffices((p) =>
              produce(p, (d) => {
                d.items.unshift(val)
                return d
              })
            )
          }
          trigger={
            <Button variant={"outline"}>
              <span>
                <Plus className="size-4" />
              </span>
              <span>Add Office...</span>
            </Button>
          }
        />
      </div>
      {offices.items.length === 0 ? (
        <Card className="flex h-96 p-8">
          <EmptyPage label="No office found, Let's create one." />
        </Card>
      ) : (
        offices.items.map((item, i) => (
          <div key={item.id}>
            <Card className="group max-w-screen-lg">
              <CardHeader className="">
                <div className="relative flex justify-between">
                  <CardTitle>{item.name || "-"}</CardTitle>
                  <div className="invisible absolute -top-2 right-0 h-1 space-x-2 group-hover:visible">
                    <CompanyOfficeForm
                      data={item}
                      setData={(val) =>
                        setOffices((p) => {
                          p.items.splice(i, 1, val)
                          return p
                        })
                      }
                      trigger={
                        <Button variant={"outline"} size={"icon-sm"}>
                          <PenLine />
                        </Button>
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
                            delete this office form your organization.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <Label className="block py-1">{item?.location || "-"}</Label>

                <Separator />
              </CardHeader>
              <CardContent>
                <div>
                  <div className="grid grid-cols-2 gap-6">
                    {/* <div>
                  <Label>Number of Employees</Label>
                  <p>{item?.employeesCount || 0}</p>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <p>{item?.timezone || 0}</p>
                </div> */}

                    <div>
                      <Label>Contact Number</Label>
                      <p>{item?.phone || "-"}</p>{" "}
                    </div>
                    <div>
                      <Label>Contact Email</Label>
                      <p>{item?.email || "-"}</p>{" "}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  )
}
