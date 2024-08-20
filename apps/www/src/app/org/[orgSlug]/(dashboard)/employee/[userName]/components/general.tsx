"use client"

import React, { useState } from "react"
import { useEmployee } from "@/context/employee"
import { EmployeeGeneralForm } from "@/forms/employee/general"
import { format } from "date-fns"
import { PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function EmployeeGeneral() {
  const [edit, setEdit] = useState(false)
  const { employee } = useEmployee()
  const formId = "employee-general"
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">General Information</h1>
          <Label>Basic information about employee</Label>
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

      <>
        {edit ? (
          <EmployeeGeneralForm id={formId} onSubmit={() => setEdit(false)} />
        ) : (
          <>
            <Card>
              <CardHeader className="grid grid-cols-[auto,200px]">
                <CardTitle>Personal Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="grid grid-cols-[200px,auto] gap-6">
                    <p className="text-muted-foreground">Full Name</p>
                    <p>
                      {`${employee?.first_name || ""} ${employee?.middle_name || ""} ${employee?.last_name || ""}`.trim() ||
                        "-"}
                    </p>
                    <p className="text-muted-foreground">Gender</p>
                    <p>{employee?.gender || "-"}</p>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p>
                      {(employee?.date_of_birth &&
                        format(employee?.date_of_birth, "P")) ||
                        "-"}
                    </p>
                    <p className="text-muted-foreground">Email</p>
                    <p>{employee?.work_email || "-"}</p>
                    <p className="text-muted-foreground">Phone Number</p>
                    <p>{employee?.phone || "-"}</p>
                    <p className="text-muted-foreground">Country</p>
                    <p>{employee?.address?.country || "-"}</p>
                    <p className="text-muted-foreground">Marital Status</p>
                    <p>{employee?.marital_status || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid grid-cols-[auto,200px]">
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="grid grid-cols-[200px,auto] gap-6">
                    <p className="text-muted-foreground">Primary Address</p>
                    <p>
                      {`${employee?.address?.line1 || ""} ${employee?.address?.line2 || ""}`.trim() ||
                        "-"}
                    </p>
                    <p className="text-muted-foreground">City</p>
                    <p>{employee?.address?.city || "-"}</p>
                    <p className="text-muted-foreground">State/Province</p>
                    <p>{employee?.address?.state || "-"}</p>
                    <p className="text-muted-foreground">Country</p>
                    <p>{employee?.address?.country || "-"}</p>
                    <p className="text-muted-foreground">Zip Code</p>
                    <p>{employee?.address?.zip_code || ""}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="grid grid-cols-[auto,200px]">
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                {(employee?.emergency_contacts?.length || 0) > 0 ? (
                  employee?.emergency_contacts?.map((e, i) => (
                    <div key={i}>
                      <div className="grid grid-cols-[200px,auto] gap-6">
                        <p className="text-muted-foreground">Full Name</p>
                        <p>{e?.name || "-"}</p>
                        <p className="text-muted-foreground">Phone Number</p>
                        <p>{e?.phone || "-"}</p>
                        <p className="text-muted-foreground">Relation</p>
                        <p>{e?.relation || "-"}</p>
                      </div>
                      {i < employee?.emergency_contacts.length - 1 && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    <h1>No Emergency Contacts found...</h1>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </>
    </div>
  )
}
