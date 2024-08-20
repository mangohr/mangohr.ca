import React from "react"
import { Metadata } from "next"
import VerifyMagicLinkForm from "@/forms/auth/verify"

export const metadata: Metadata = {
  title: "Verification",
  description: "Verify to your account",
}

export default function Page() {
  return <VerifyMagicLinkForm />
}
