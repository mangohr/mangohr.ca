import React from "react"
import { getEmployeeJobs } from "@/_server/handlers/job"
import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const JobTimeline = ({
  data,
}: {
  data: Awaited<ReturnType<typeof getEmployeeJobs>>
}) => {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[auto,200px]">
        <CardTitle>Job Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Job Title</TableHead>
              <TableHead>Reports To</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="px-8 py-24 text-center">
                  No Job History Found...
                </TableCell>
              </TableRow>
            ) : (
              data?.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <p className="font-medium">{d.title}</p>
                    <Label className="font-light capitalize">
                      {d.type?.replaceAll("_", " ") || "-"}
                    </Label>
                  </TableCell>
                  <TableCell>{d.reports_to || "-"}</TableCell>
                  <TableCell>
                    {(d.start_date && format(d.start_date, "PP")) || "-"}
                  </TableCell>
                  <TableCell>
                    {(d.end_date && format(d.end_date, "PP")) || "Present"}{" "}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default JobTimeline
