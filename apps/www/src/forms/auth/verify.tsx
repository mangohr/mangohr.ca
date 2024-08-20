"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { signInWithEmail } from "@/_server/actions/auth"
import { useAuthStore } from "@/stores/auth"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export default function VerifyMagicLinkForm() {
  const { email } = useAuthStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (!isHydrated) setIsHydrated(true)
    if (isHydrated && !email) redirect("login")
  }, [email, isHydrated])

  if (!email) return null

  return (
    <div className="relative flex h-full flex-col justify-center p-8">
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8"></div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verification Link Sent
          </h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification link to{" "}
            <span className="font-semibold">{email || "your email"}</span>,
            Please check you inbox.
          </p>
        </div>
        <Button onClick={() => signInWithEmail({ email })}>Resend Email</Button>
        <p className="text-sm text-muted-foreground">
          Not received? Don&apos;t forget to check spam folder.
        </p>
        <Link
          href={"/auth/login"}
          className={cn(buttonVariants({ variant: "link" }), "h-0 w-fit p-0")}
        >
          &lt;-&nbsp; Go back to Login
        </Link>
      </div>
    </div>
  )
}
