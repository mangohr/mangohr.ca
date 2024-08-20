import Link from "next/link"
import { logout } from "@/_server/actions/auth"
import { auth, signOut } from "@/auth"

import { Button, buttonVariants } from "@/components/ui/button"

export default async function Home() {
  const session = await auth()
  return (
    <main className="space-y-8 p-24">
      <div className="flex items-start justify-start gap-8">
        <Link className={buttonVariants({ variant: "outline" })} href={"/org"}>
          Dashboard
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/onboard"}
        >
          Onboard
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/auth/login"}
        >
          Login
        </Link>
        <form
          action={async (formData) => {
            "use server"
            await signOut()
          }}
        >
          <Button variant={"outline"} type="submit">
            Sign out
          </Button>
        </form>
        {/* <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/auth/signup"}
        >
          Sign Up
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/auth/forgot-password"}
        >
          Forgot Password
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/auth/reset-password"}
        >
          Reset Password
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={"/auth/verify-email"}
        >
          Verify Email
        </Link> */}
      </div>
      <p>Logged IN - {(!!session?.user).toString()}</p>
      <p>{JSON.stringify(session?.user, null, 2)}</p>
      {session?.user && (
        <form action={logout}>
          <Button>Logout</Button>
        </form>
      )}
    </main>
  )
}
