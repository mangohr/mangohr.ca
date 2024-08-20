"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getAllTimeOffs } from "@/_server/actions/timeoff"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowRight, MoreVertical } from "lucide-react"

import { formatTimeDifference } from "@/lib/date"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ListTable from "@/components/tables"

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllTimeOffs>>["items"][0]>()

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
  columnHelper.accessor("start_date", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timeline
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const v = row.original

      return (
        <Badge variant={"outline"} className="font-light">
          {format(v.start_date, "PP")}
          <ArrowRight className="mx-2 size-3" />
          {format(v.end_date, "PP")}
        </Badge>
      )
    },
  }),
  columnHelper.accessor("cost", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit p-0 hover:bg-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Days
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const v = getValue()
      return <div className="lowercase">{getValue() || "-"}</div>
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => (
      <div className="capitalize">
        <Badge
          className="capitalize"
          variant={
            getValue() === "approved"
              ? "default"
              : getValue() === "pending"
                ? "secondary"
                : "outline"
          }
        >
          {getValue().replaceAll("_", " ")}
        </Badge>
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
          <Button size="icon" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </div>
      )
    },
  }),
]

export default function TimeOffList() {
  const router = useRouter()

  return (
    <ListTable
      queryKey="timeoffs"
      columns={columns}
      getData={(params) => getAllTimeOffs({ searchParams: params })}
      config={{
        searchInput: {
          placeholder: "Search Employee ID, Name or Email...",
        },
        empty: { title: "No Requests!" },
        loading: { title: "Finding Timeoff Requests..." },
      }}
    />
  )
}
