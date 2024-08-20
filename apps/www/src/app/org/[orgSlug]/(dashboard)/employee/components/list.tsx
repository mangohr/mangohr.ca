"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getAllEmployees } from "@/_server/actions/employee"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ListTable from "@/components/tables"

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllEmployees>>["items"][0]>()

const columns = [
  columnHelper.accessor("image", {
    header: "",
    cell: ({ row, getValue }) => {
      return (
        <div className="flex justify-center gap-4">
          <Avatar>
            <AvatarImage src={getValue() || ""} />
            <AvatarFallback>
              {row.original.name
                ?.split(" ")
                .slice(0, 2)
                .map((v) => v[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      )
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  }),
  columnHelper.accessor("department", {
    header: "Department",
    cell: (val) => <div className="capitalize">{val.getValue()}</div>,
  }),
  // columnHelper.accessor("position", {
  //   header: "Position",
  //   cell: (val) => <div className="capitalize">{val.getValue()}</div>,
  // }),
  columnHelper.accessor("hired_at", {
    header: "Hired Date",
    cell: (val) => (
      <div className="capitalize">
        {(val.getValue() &&
          format(new Date(val.getValue() || ""), "dd MMM yyyy")) ||
          "-"}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(payment.id.toString())
                }
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }),
]

export default function EmployeeList() {
  const router = useRouter()

  return (
    <ListTable
      queryKey="employees"
      columns={columns}
      getData={(params) => getAllEmployees({ searchParams: params })}
      onRowClick={(row) => router.push("employee/" + row?.username)}
      config={{
        searchInput: {
          placeholder: "Search Employee ID, Name or Email...",
        },
        empty: { title: "No Employees!" },
        loading: { title: "Finding Employees" },
      }}
    />
  )
}
