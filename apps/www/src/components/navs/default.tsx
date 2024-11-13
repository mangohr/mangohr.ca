"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { navs } from "@/constants/links"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

function DefaultNav() {
  return (
    <nav
      className="text-primary-foreground relative p-4"
      style={{ zIndex: 1000 }}
    >
      <div className="m-auto flex max-w-screen-xl items-center justify-between">
        <div>
          <Link href={navs.home.url}>
            <Image
              src="/assets/logo/full-white.png"
              width={120}
              height={110}
              alt="MangoHR"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {true ? (
            <Link
              href={navs.dashboard.url}
              className={cn(
                buttonVariants({ variant: "white-outline" }),
                "h-10 rounded-full text-lg hover:bg-transparent"
              )}
            >
              {navs.dashboard.name}
            </Link>
          ) : (
            <>
              <Link
                href={navs.login.url}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-10 text-lg"
                )}
              >
                {navs.login.name}
              </Link>

              <Link
                href={navs.login.url}
                className={cn(
                  buttonVariants({ variant: "white-outline" }),
                  "h-10 rounded-full text-lg hover:bg-transparent"
                )}
              >
                Sign Up Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default DefaultNav
