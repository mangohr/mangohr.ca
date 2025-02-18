import React, { Fragment } from "react"
import { getEmployeeTimeOff } from "@/_server/handlers/timeoff"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    cost: 1,
    effective_from: "08/06/2024",
    requested_at: "07/06/2024",
    type: "vacation",
    description: "",
    status: "pending",
  },
  {
    cost: 0.5,
    effective_from: "12/04/2024",
    requested_at: "07/04/2024",
    type: "sick_leave",
    description: "",
    status: "rejected",
  },
  {
    cost: 1,
    effective_from: "12/09/20243",
    requested_at: "07/09/2023",
    type: "vacation",
    description: "",
    status: "approved",
  },
  {
    cost: 2,
    effective_from: "12/05/2023",
    requested_at: "07/05/2023",
    type: "vacation",
    description: "",
    status: "approved",
  },
]

const TimeOffList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getEmployeeTimeOff>>
}) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Timeline</TableHead> <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="px-8 py-24 text-center">
                  No Time-off Requests Found...
                </TableCell>
              </TableRow>
            ) : (
              data?.map((t, i) => (
                <Fragment key={i}>
                  <TableRow className="border-t-0">
                    <TableCell className="py-4">
                      <p>{format(t.created_at, "PP")}</p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="capitalize"
                        variant={
                          t.status === "approved"
                            ? "default"
                            : t.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {t.status.replaceAll("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {t.type ? (
                        <Badge className="capitalize" variant={"outline"}>
                          {t.type.replaceAll("_", " ")}
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={"outline"} className="font-light">
                        {format(t.start_date, "PP")}
                        <ArrowRight className="mx-2 size-3" />
                        {format(t.end_date, "PP")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p>{t.cost}</p>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TimeOffList
