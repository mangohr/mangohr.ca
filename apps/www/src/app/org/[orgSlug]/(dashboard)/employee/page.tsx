import React from "react"
import Link from "next/link"
import { Download, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import PageLayout from "@/components/custom/layouts/page"

import EmployeeList from "./components/list"

export default async function Page() {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your employees
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={"new-employee"} className={cn(buttonVariants())}>
            <Plus height={18} width={18} strokeWidth={1.5} />
            <span>Add Employee</span>
          </Link>
        </div>
      </div>
      {/* <div>
        <EmployeeBarChart />
      </div> */}
      <div className="grid">
        <EmployeeList />
      </div>
    </PageLayout>
  )
}
