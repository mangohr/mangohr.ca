"use client"

import React, { useEffect, useOptimistic, useState } from "react"
import { getAllEmployeesRoles } from "@/_server/handlers/employee"
import { roles } from "@/constants/roles"
import EmployeeRoleForm from "@/forms/employee/role"
import { PenLine, Search } from "lucide-react"
import { parseAsStringEnum, useQueryState } from "nuqs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PermissionInfo({
  data,
}: {
  data: Awaited<ReturnType<typeof getAllEmployeesRoles>>
}) {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringEnum(["roles", "scopes"])
  )
  return (
    <div className="max-w-screen-lg space-y-6">
      <div className="flex items-center space-x-6">
        <div className="flex-1">
          <h1 className="text-xl font-medium">Permissions</h1>
          <Label>List of work schedules in your company.</Label>
        </div>
      </div>

      <Card className="grid grid-cols-4 [&>:not(:last-child)]:border-r">
        {Object.keys(roles).map((r, i) => {
          const role = data.roles.find((e) => e.role === r)
          return (
            <div key={i} className="flex flex-col justify-between p-4">
              <CardDescription className="capitalize">{r}</CardDescription>
              <CardTitle className="text-2xl">
                {String(role?.count || 0).padStart(2, "0")}
              </CardTitle>
            </div>
          )
        })}
      </Card>

      <Input
        prefixEl={<Search />}
        placeholder="Search Employee"
        className="w-full"
      />
      <div className="bg-background rounded-md border">
        <Table>
          <TableCaption className="border-t">1 employee(s) found.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employees</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((e, i) => (
              <Single data={e} key={i} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function Single<
  T extends Awaited<ReturnType<typeof getAllEmployeesRoles>>,
>({ data }: { data: T["items"][0] }) {
  const [state, setState] = useOptimistic(data)

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-2">
          <div>
            <Avatar>
              <AvatarImage src={state.image || ""} />
              <AvatarFallback>
                {(state.name && state.name[0]) || "E"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p>{state.name}</p>
            <Label className="font-light">
              {state.scopes?.length.toString() || 0} Custom Permissions
            </Label>
          </div>
        </div>
      </TableCell>
      <TableCell className="space-x-2">
        <Badge variant={"outline"}>{state.role || "No Role Assigned"} </Badge>
      </TableCell>
      <TableCell className="text-end">
        <EmployeeRoleForm
          trigger={
            <Button variant={"ghost"} size={"icon"}>
              <PenLine width={18} height={18} />
            </Button>
          }
          data={state}
          setData={setState}
        />
      </TableCell>
    </TableRow>
  )
}
