import React from "react"
import { Download } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EmptyPage from "@/components/pages/empty"

const data: { id: string; plan: string; amount: number; date: string }[] = [
  // { id: "105", plan: "Free", amount: 0, date: "20/05/2024" },
  // { id: "103", plan: "Pro", amount: 19.99, date: "20/04/2024" },
  // { id: "102", plan: "Pro", amount: 19.99, date: "20/03/2024" },
  // { id: "101", plan: "Pro", amount: 19.99, date: "20/02/2024" },
]

export default function SubscriptionInfo() {
  return (
    <div className="space-y-6">
      <Card className="max-w-screen-lg">
        <CardHeader className="grid grid-cols-[auto,200px]">
          <CardTitle>Current Subscription</CardTitle>
          <div className="relative flex justify-end">
            <div className="absolute -bottom-2 -right-2">
              <Button>Upgrade Plan</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid grid-cols-[250px,auto] gap-4">
              <p className="text-muted-foreground">Plan</p>
              <p>
                <Badge variant="outline">Free Plan</Badge>
              </p>
              <p className="text-muted-foreground">Current Period</p>
              <p>20 June, 2024 - 20 July, 2024</p>
              <p className="text-muted-foreground">Price</p>
              <p>0 CAD</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="max-w-screen-lg">
        <CardHeader className="grid grid-cols-[auto,200px]">
          <CardTitle>Subscription History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Invoice</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="">Cycle</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead className=""></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell className="py-4">#{d.id}</TableCell>

                    <TableCell>
                      <Badge variant={"outline"}>{d.plan}</Badge>
                    </TableCell>
                    <TableCell>{d.date}</TableCell>
                    <TableCell>{d.amount} CAD</TableCell>
                    <TableCell>
                      <Download
                        className="size-4 stroke-muted-foreground"
                        strokeWidth={1.7}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-96 p-8">
                    <EmptyPage label="No transaction history found." />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
