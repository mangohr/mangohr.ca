"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useSession } from "@/context/session"

import { isSuperUser } from "@/lib/user"
import { cn } from "@/lib/utils"

import { superUserNavs } from "./data"

export default function Sidebar() {
  const path = usePathname()
  const { orgSlug } = useParams() as { orgSlug: string }
  const { session } = useSession()
  const [expand, setExpand] = useState(false)

  const navs = superUserNavs

  if (!isSuperUser(session?.employee?.roles)) return null

  return (
    <div className={cn("w-14")}>
      <div
        onMouseEnter={() => setExpand(true)}
        onMouseLeave={() => setExpand(false)}
        className={cn(
          "bg-background fixed inset-y-0 left-0 z-50 hidden w-14 flex-col overflow-hidden border-r transition-all duration-300 ease-in-out sm:flex",
          expand && "w-48"
        )}
      >
        <nav className="flex flex-col items-start gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="text-foreground flex items-end justify-start space-x-1 rounded-lg transition-colors md:h-8"
            onClick={() => setExpand(false)}
          >
            <span className="flex w-9 justify-center">
              <Image src="/logo.svg" alt="Mango HR" width={18} height={15} />
            </span>
            <span
              className={cn(
                "line-clamp-1 w-0 flex-1 origin-left text-lg font-medium opacity-0  transition-all duration-300 ease-in-out",
                expand && "w-full opacity-100"
              )}
            >
              Mango HR
            </span>
          </Link>
          {navs(orgSlug).main.map((m, i) => (
            <Link
              key={i}
              href={m.url}
              onClick={() => setExpand(false)}
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-start rounded-lg transition-colors md:h-9",
                expand && "w-full space-x-1",
                (m.url === "/org/" + orgSlug
                  ? path === m.url
                  : path.includes(m.url)) && "bg-primary/10 text-foreground"
              )}
            >
              <span className="flex w-9 justify-center">
                <m.icon strokeWidth={1.7} height={20} width={20} />
              </span>
              <span
                className={cn(
                  "line-clamp-1 w-0 flex-1 origin-left text-sm leading-none opacity-0  transition-all duration-300 ease-in-out",
                  expand && "w-full opacity-100"
                )}
              >
                {m.name}
              </span>
            </Link>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-4">
          {navs(orgSlug).bottom.map((m, i) => (
            <Link
              key={i}
              href={m.url}
              onClick={() => setExpand(false)}
              className={cn(
                "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-start rounded-lg transition-colors md:h-9",
                expand && "w-full space-x-1",
                path.includes(m.url) && "bg-primary/10 text-foreground"
              )}
            >
              <span className="flex w-9 justify-center">
                <m.icon strokeWidth={1.7} height={20} width={20} />
              </span>
              <span
                className={cn(
                  "line-clamp-1 w-0 flex-1 origin-left text-sm leading-none opacity-0  transition-all duration-300 ease-in-out",
                  expand && "w-full opacity-100"
                )}
              >
                {m.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
