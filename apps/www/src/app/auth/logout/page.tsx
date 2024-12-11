"use client"

import React, { useEffect } from "react"
import { logout } from "@/_server/actions/auth"

import Loading from "@/components/ui/loading"

export default function Page() {
  const call = async () => {
    await logout()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      call()
    }, 500)
  }, [])

  return <Loading title="Logging Out" />
}
