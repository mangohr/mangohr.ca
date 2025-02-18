"use client"

import * as React from "react"
import Link from "next/link"
import { getAllTimeOffs } from "@/_server/actions/timeoff"
import { queryKeys } from "@/constants/queryKeys"
import ApproveTimeOffForm from "@/forms/timeoff/approve"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import {
  ArrowRight,
  ExternalLink,
  Eye,
  MoreVertical,
  SquareArrowOutUpRight,
  Terminal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import ListTable from "@/components/tables"

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllTimeOffs>>["items"][0]>()

const columns = [
  columnHelper.accessor("image", {
    header: "",
    cell: ({ row, getValue }) => {
      return (
        <p className="flex items-center justify-center">
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
        </p>
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
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
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
    cell: ({ row, getValue }) => {
      const v = getValue()
      return <p className="lowercase">{getValue() || "-"}</p>
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue, row }) => (
      <p className="capitalize">
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
      </p>
    ),
  }),
  // columnHelper.display({
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <div className="flex justify-center">
  //         <Button size="icon" variant="ghost">
  //           <MoreVertical className="size-4" />
  //         </Button>
  //       </div>
  //     )
  //   },
  // }),
]

export default function TimeOffList() {
  const [data, setData] = React.useState<
    Awaited<ReturnType<typeof getAllTimeOffs>>["items"][0] | null
  >(null)

  return (
    <>
      {/* <ApproveTimeOffForm data={data}/> */}
      <Dialog open={!!data} onOpenChange={(open) => !open && setData(null)}>
        <DialogTrigger></DialogTrigger>
        <DialogContent
          className="max-w-screen-md"
          actionBtns={[
            {
              href: `employee/${data?.username}/time-off`,
              icon: SquareArrowOutUpRight,
            },
          ]}
        >
          <DialogHeader>
            <DialogTitle>Time-off Request</DialogTitle>{" "}
            <DialogDescription>
              {"Employee's time-off request."}
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-6">
            <div className="grid grid-cols-[200px,auto] items-center gap-6 text-sm">
              <p>Days</p>
              <p className="capitalize">{data?.cost}</p>
              <p>Status</p>
              <p className="capitalize">{data?.status.replaceAll("_", " ")}</p>
              <p>Timeline</p>
              <span className="flex items-center gap-2">
                <span>
                  {(data?.start_date && format(data?.start_date, "PP")) ||
                    "No Date"}
                </span>
                <span>
                  <ArrowRight className="mx-2 size-3" />
                </span>
                <span>
                  {(data?.end_date && format(data?.end_date, "PP")) ||
                    "No Date"}
                </span>
              </span>

              <p>Employee</p>
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={data?.image || ""} />
                  <AvatarFallback>
                    {data?.name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((v) => v[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Link href={`employee/${data?.username}`}>
                  <p className="text-sm leading-none">{data?.name}</p>
                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                    <span>View Employee</span> <ArrowRight className="size-2" />
                  </p>
                </Link>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-[200px,auto] items-center gap-6 text-sm">
              <p>Request Reason</p>
              <p>
                {data?.request_reason ||
                  "No reason mentioned by employee for this timeoff request..."}
              </p>
            </div>
            {data?.action_message && (
              <>
                <Separator />

                <div className="grid grid-cols-[200px,auto] items-center gap-6 text-sm">
                  <p>Reject Reason</p>
                  <p>{data?.request_reason || "No reason mentioned..."}</p>
                </div>
              </>
            )}
            <Separator />

            {data?.status === "pending" ? (
              <>
                <ApproveTimeOffForm
                  employee={data?.username || ""}
                  request={data?.id || ""}
                  onSuccess={(v) => v && setData(null)}
                />
              </>
            ) : (
              <Alert
                variant={data?.status === "rejected" ? "default" : "success"}
              >
                <Terminal className="size-4" />
                <AlertTitle className="capitalize">{data?.status}!</AlertTitle>
                <AlertDescription>
                  Request have been {data?.status} by{" "}
                  <Link
                    href={`employee/${data?.action_username}`}
                    className="underline"
                  >
                    {data?.action_name} ({data?.username})
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </DialogBody>
        </DialogContent>
      </Dialog>
      <ListTable
        queryKey={queryKeys.timeoffList}
        columns={columns}
        getData={(params) => getAllTimeOffs({ searchParams: params })}
        config={{
          searchInput: {
            placeholder: "Search Employee ID, Name or Email...",
          },
          empty: { title: "No Requests!" },
          loading: { title: "Finding Timeoff Requests..." },
        }}
        onRowClick={(v) => setData(v)}
      />
    </>
  )
}
