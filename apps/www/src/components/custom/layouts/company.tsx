"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useOrg } from "@/context/org"
import { format } from "date-fns"
import { Building, Globe, Mail, MapPin, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"

export default function CompanyLayout({ children }: { children: ReactNode }) {
  const { orgSlug } = useParams() as { orgSlug: string }
  const { org } = useOrg()
  const navs = [
    {
      url: `/org/${orgSlug}/company`,
      label: "Company Info",
    },

    {
      url: `/org/${orgSlug}/company/offices`,
      label: "Offices",
    },
    {
      url: `/org/${orgSlug}/company/departments`,
      label: "Departments",
    },
    {
      url: `/org/${orgSlug}/company/work-schedules`,
      label: "Work Schedules",
    },
    {
      url: `/org/${orgSlug}/company/permissions`,
      label: "Permissions",
    },
    {
      url: `/org/${orgSlug}/company/subscription`,
      label: "Subscriptions",
    },
    {
      url: `/org/${orgSlug}/company/notifications`,
      label: "Notifications",
    },
  ]

  const path = usePathname()

  let matchIdx = 0

  navs.forEach((n, i) => {
    path.includes(n.url) && (matchIdx = i)
  })

  return (
    <div className="w-full max-w-screen-xl text-sm">
      <div className="flex gap-8">
        <div className="sticky min-h-screen space-y-6 border-r p-8">
          <div className="flex flex-col items-center space-y-3 text-center">
            <Avatar className="size-[175px] rounded-lg p-4">
              <AvatarImage src="/logo.svg" />
              <AvatarFallback className="flex-1 rounded-none text-5xl">
                <Building width={75} height={75} strokeWidth={1.5} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">
                {org?.name || "No Name"}
              </h1>
              <p>{org?.industry || "No Industry"}</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-start gap-4">
              <Globe width={17} height={17} />{" "}
              <span className="break-all">{org?.website || "No Website"}</span>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Mail width={17} height={17} />{" "}
              <span className="break-all">{org?.email || "No Email"}</span>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Phone width={17} height={17} />{" "}
              <span className="break-all">{org?.phone || "No Phone"}</span>
            </div>
            <div className="flex items-center justify-start gap-4">
              <MapPin width={18} height={18} />{" "}
              <span className="break-all">
                {org?.location || "No Location"}
              </span>
            </div>
          </div>
          <Separator />

          <div className="space-y-4 text-sm">
            <div className="space-y-1">
              <Label>Company ID</Label>
              <p>{org?.slug}</p>
            </div>
            <div className="space-y-1">
              <Label>Established on</Label>
              <p>
                {(org?.established_on &&
                  format(new Date(org?.established_on), "PPP")) ||
                  "Unknown"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-8">
          <NavigationMenu>
            <NavigationMenuList className="bg-background text-muted-foreground inline-flex items-center justify-center gap-1 rounded-lg border p-1">
              {navs.map((nav, i) => (
                <NavigationMenuItem key={i}>
                  <Link href={nav.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "ring-offset-background hover:bg-muted focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
