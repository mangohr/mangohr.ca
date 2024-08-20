"use client"

import React, { useState } from "react"
import { useOrg } from "@/context/org"
import { OrgGeneralForm } from "@/forms/org/info"
import { format } from "date-fns"
import { PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function Page() {
  const { org } = useOrg()
  const [edit, setEdit] = useState(false)
  const formId = "company-general"

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Company Public Info</h1>
          <Label>Information about your company.</Label>
        </div>
        <div className="ml-auto flex space-x-4">
          {edit ? (
            <>
              <Button variant={"outline"} onClick={() => setEdit(false)}>
                Cancel
              </Button>
              <Button variant={"default"} type="submit" form={formId}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant={"outline"} onClick={() => setEdit(true)}>
              <PenLine />
              <span>Edit Information</span>
            </Button>
          )}
        </div>
      </div>
      {edit ? (
        <OrgGeneralForm id={formId} onSubmit={() => setEdit(false)} />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Company Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4 grid grid-cols-[200px,auto] gap-8">
              <Label>Company Name</Label>
              <p>{org?.name || "-"}</p>

              <Label>Company Website</Label>
              <p>{org?.website || "-"}</p>
              <Label>Company Email</Label>
              <p>{org?.email || "-"}</p>
              <Label>Company Phone</Label>
              <p>{org?.phone || "-"}</p>
              <Label>Industry</Label>
              <p>{org?.industry || "-"}</p>
              <Label>Location</Label>
              <p>{org?.location || "-"}</p>
              <Label>Established on</Label>
              <p>
                {(org?.established_on && format(org?.established_on, "PP")) ||
                  "-"}
              </p>
              <Label>Bio</Label>
              <p>{org?.bio || "-"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
