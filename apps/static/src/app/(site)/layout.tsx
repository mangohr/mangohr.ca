import React, { ReactNode } from "react"

import DefaultFooter from "@/components/footer"
import DefaultNav from "@/components/navs/default"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultNav />
      {children}
      <DefaultFooter />
    </>
  )
}
