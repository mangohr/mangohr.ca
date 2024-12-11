import { Metadata } from "next"
import { AuthForm } from "@/forms/auth/login"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function Page() {
  return (
    <>
      <AuthForm />
    </>
  )
}
