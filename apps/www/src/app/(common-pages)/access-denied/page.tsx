"use client"

import React from "react"
import { Hand } from "lucide-react"

import ErrorPage from "@/components/pages/error"

const page = () => {
  return (
    <ErrorPage
      title="Permission Denied"
      message="You don't permissions to access this resource."
      icon={Hand}
    />
  )
}

export default page
