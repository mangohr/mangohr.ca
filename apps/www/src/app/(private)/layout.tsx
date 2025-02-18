import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/_server/actions/auth"

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session) {
    return redirect("/auth/login")
  }

  return children
}
