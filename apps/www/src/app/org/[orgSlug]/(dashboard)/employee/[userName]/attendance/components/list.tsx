import React from "react"
import { getEmployeeAttendance } from "@/_server/handlers/attendance"
import { format } from "date-fns"

import { formatTimeDifference } from "@/lib/date"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AttendanceList = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getEmployeeAttendance>>["history"]
}) => {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[auto,200px]">
        <CardTitle>Attendance List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Logout</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Deficit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="px-8 py-24 text-center">
                  No Attendance History Found...
                </TableCell>
              </TableRow>
            ) : (
              data?.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <p>{format(t.login, "PP")}</p>
                  </TableCell>
                  <TableCell>
                    <p>{format(t.login, "p, OOO") || "-"}</p>
                    {/* {t.login.location && (
                    <Label className="text-xs font-light">
                      {t.login.location}
                    </Label>
                  )} */}
                  </TableCell>
                  <TableCell>
                    <p>{(t.logout && format(t.logout, "p, OOO")) || "-"}</p>
                    {/* {t.logout.location && (
                    <Label className="text-xs font-light">
                      {t.logout.location}
                    </Label>
                  )} */}
                  </TableCell>
                  <TableCell>
                    {(t.logout && formatTimeDifference(t.login, t.logout)) ||
                      "TBD"}
                  </TableCell>
                  <TableCell>TBD</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AttendanceList
