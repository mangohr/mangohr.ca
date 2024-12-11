"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getAllAttendance } from "@/_server/actions/attendance"
import { queryKeys } from "@/constants/queryKeys"
import AttendanceActions from "@/forms/attendance/actions"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"

import { formatTimeDifference } from "@/lib/date"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ListTable from "@/components/tables"

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllAttendance>>["items"][0]>()

const columns = [
  columnHelper.accessor("image", {
    header: "",
    cell: ({ row, getValue }) => {
      return (
        <Link
          href={"employee/" + row?.original?.username}
          className="flex justify-center gap-4"
        >
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
        </Link>
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
    cell: ({ row }) => (
      <Link href={"employee/" + row?.original?.username}>
        {row.getValue("name")}
      </Link>
    ),
  }),
  columnHelper.accessor("login", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Login
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link href={"employee/" + row?.original?.username} className="lowercase">
        {format(row.getValue("login"), "Pp")}
      </Link>
    ),
  }),
  columnHelper.accessor("logout", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Logout
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link href={"employee/" + row?.original?.username} className="lowercase">
        {format(row.getValue("logout"), "Pp")}
      </Link>
    ),
  }),
  // columnHelper.accessor("position", {
  //   header: "Position",
  //   cell: (val) => <div className="capitalize">{val.getValue()}</div>,
  // }),
  columnHelper.display({
    id: "total_hrs",
    header: "Total Hours",
    cell: ({ row }) => {
      const total =
        row.original.logout &&
        row.original.login &&
        formatTimeDifference(row.original.login, row.original.logout)
      return (
        <Link
          href={"employee/" + row?.original?.username}
          className="capitalize"
        >
          {total || "TBD"}
        </Link>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <AttendanceActions data={row.original} />
        </div>
      )
    },
  }),
]

export default function AttendanceList() {
  const router = useRouter()

  return (
    <ListTable
      queryKey={queryKeys.attendanceList}
      columns={columns}
      getData={(params) => getAllAttendance({ searchParams: params })}
      config={{
        searchInput: {
          placeholder: "Search Employee ID, Name or Email...",
        },
        empty: { title: "No Attendances!" },
        loading: { title: "Finding Attendances" },
      }}
    />
  )
}
