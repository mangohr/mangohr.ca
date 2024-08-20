"use client"

import React, { Fragment, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { logout } from "@/_server/actions/auth"
import { PanelLeft } from "lucide-react"
import { Session } from "next-auth"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { navs } from "./data"

export default function Header({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false)
  const { orgSlug } = useParams() as { orgSlug: string }
  let pathname = usePathname()

  pathname[0] === "/" && (pathname = pathname.substring(1))
  pathname[pathname.length - 1] === "/" &&
    (pathname = pathname.substring(0, pathname.length - 1))

  const paths = pathname.split("/")

  let breadcrumbs: Array<{ name: string; url: string | null }> = []

  paths.forEach((p, i) => {
    const url = paths.slice(0, i + 1).join("/")
    if (p === "org") return
    breadcrumbs.push({
      name: p,
      url: url === pathname ? null : "/" + url,
    })
  })

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-end justify-start space-x-1 rounded-lg text-foreground transition-colors md:h-8"
            >
              {/* <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span> */}
              <span className="flex w-9 justify-center">
                <Image src="/logo.svg" alt="Mango HR" width={18} height={15} />
              </span>
              <span className={cn("line-clamp-1 flex-1 text-lg font-medium")}>
                Mango HR
              </span>
            </Link>
            {navs(orgSlug).main.map((n, i) => (
              <Link
                key={i}
                href={n.url}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <n.icon className="size-5" />
                {n.name}
              </Link>
            ))}
            {navs(orgSlug).bottom.map((n, i) => (
              <Link
                key={i}
                href={n.url}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <n.icon className="size-5" />
                {n.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbs.map((b, i) => (
            <Fragment key={i}>
              <BreadcrumbItem key={i}>
                <BreadcrumbLink asChild>
                  {b.url ? (
                    <Link href={b.url} className="capitalize">
                      {b.name}
                    </Link>
                  ) : (
                    <BreadcrumbPage className="capitalize">
                      {b.name}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        /> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage
                src={session?.user?.image || ""}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                {(session?.user?.name && session?.user?.name[0]) || "A"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"dashboard/settings"}>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
