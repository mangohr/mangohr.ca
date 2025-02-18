import React from "react"
import { getDashboardData } from "@/_server/handlers/dashboard"
import { addDays, format } from "date-fns"
import { ArrowRight } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export const LeaveRequestCard = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getDashboardData>>["recentLeaveRequests"]
}) => {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-3">
        <CardTitle className="mb-1">Leave Requests</CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <Table>
          <TableBody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <div>
                      <Avatar>
                        <AvatarImage src={d?.image || ""} />
                        <AvatarFallback>KB</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p>{d?.name}</p>
                      <Label className="text-xs font-light">{d.username}</Label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outline"} className="font-light">
                      {format(d.start_date, "PP")}
                      <ArrowRight className="mx-2 size-3" />
                      {format(addDays(d.end_date, 1), "PP")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {d.cost} <span className="text-sm font-light">days</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        d.status === "approved"
                          ? "default"
                          : d.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                      className="font-light capitalize"
                    >
                      {d.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="bg-muted/50 h-64 text-center">
                  No Requests!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
