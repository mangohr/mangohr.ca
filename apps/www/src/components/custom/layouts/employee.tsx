"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEmployee } from "@/context/employee"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const { employee: data } = useEmployee()

  const { userName, orgSlug } = useParams() as {
    userName: string
    orgSlug: string
  }
  const navs = [
    {
      url: `/org/${orgSlug}/employee/${userName}`,
      label: "General",
    },
    {
      url: `/org/${orgSlug}/employee/${userName}/job-pay`,
      label: "Job & Pay",
    },
    {
      url: `/org/${orgSlug}/employee/${userName}/attendance`,
      label: "Attendance",
    },
    {
      url: `/org/${orgSlug}/employee/${userName}/time-off`,
      label: "Time Off",
    },
    {
      url: `/org/${orgSlug}/employee/${userName}/documents`,
      label: "Documents",
    },
  ]

  const path = usePathname()

  let matchIdx = 0

  navs.forEach((n, i) => {
    path.includes(n.url) && (matchIdx = i)
  })

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex min-h-screen">
        <div className="relative border-r px-8 py-12">
          <div className="sticky top-0 space-y-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <Avatar className="size-[175px] rounded-lg">
                <AvatarImage src={data?.image?.replace("s96", "s500") || ""} />
                <AvatarFallback className="flex-1 rounded-none text-5xl">
                  {data?.first_name
                    ?.split(" ")
                    .map((s) => s[0])
                    .splice(0, 2)
                    .join("") || "-"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">
                  {`${data?.first_name || ""} ${data?.middle_name || ""} ${data?.last_name || ""}`.trim() ||
                    "No Name"}
                </h1>
                <p className="capitalize">
                  {data?.current_job?.title || "No Designation"}
                </p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-start gap-4">
                <Mail className="size-4 min-w-4" />
                <span className="break-all">
                  {data?.work_email || "No Email"}
                </span>
              </div>
              <div className="flex items-center justify-start gap-4">
                <Phone className="size-4 min-w-4" />{" "}
                <span className="break-all">{data?.phone || "No Phone"}</span>
              </div>
              <div className="flex items-center justify-start gap-4">
                <MapPin className="size-4 min-w-4" />{" "}
                <span className="break-all">
                  {`${data?.address?.city || ""} ${data?.address?.country || ""}`.trim() ||
                    "No Address"}
                </span>
              </div>
            </div>
            <Separator />

            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <Label>Department</Label>
                <p>{data?.department?.name || "No Department"}</p>
              </div>
              <div className="space-y-1">
                <Label>Office</Label>
                <p>{data?.office?.name || "No Office"}</p>
              </div>
              <div className="space-y-1">
                <Label>Reports to</Label>
                <div className="flex items-center justify-start gap-2">
                  {data?.current_job?.reports_to?.image && (
                    <Avatar className="size-8">
                      <AvatarImage
                        src={data?.current_job?.reports_to?.image || ""}
                      />
                      <AvatarFallback>
                        {data?.current_job?.reports_to?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span>
                    {data?.current_job?.reports_to?.name || "Not Assigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6 px-8 py-12">
          <NavigationMenu>
            <NavigationMenuList className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border bg-background p-1 text-muted-foreground">
              {navs.map((nav, i) => (
                <NavigationMenuItem key={i}>
                  <Link href={nav.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        matchIdx === i && "text-primary"
                      )}
                    >
                      {nav.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {children}
          {/* <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general">
                <User2 width={14} height={14} className="relative top-[-1px]" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="job_pay">
                <Briefcase width={14} height={14} />

                <span>Job & Pay</span>
              </TabsTrigger>
              <TabsTrigger value="attendance">
                <Building width={14} height={14} />
                <span>Attendance</span>
              </TabsTrigger>
              <TabsTrigger value="time-off">
                <Timer width={14} height={14} />
                <span>Time-Off</span>
              </TabsTrigger>
              <TabsTrigger value="documents">
                <Files width={14} height={14} className="relative top-[-1px]" />
                <span>Documents</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-6">
              <PersonalInfo />
              <AddressInfo />
              <EmergencyInfo />
            </TabsContent>
            <TabsContent value="job_pay" className="space-y-6">
              Job & Pay
            </TabsContent>
            <TabsContent value="company" className="space-y-6">
              Company
            </TabsContent>{" "}
            <TabsContent value="documents" className="space-y-6">
              Documents
            </TabsContent>
          </Tabs> */}
        </div>
      </div>
    </div>
  )
}
