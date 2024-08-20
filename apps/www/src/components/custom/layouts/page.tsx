import React, { ReactNode } from "react"

export default function PageLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-8 px-8 py-12">{children}</div>
}
