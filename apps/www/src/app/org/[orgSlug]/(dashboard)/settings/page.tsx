import React from "react"
import { getUserByEmail } from "@/_server/actions/auth"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { GoogleIcon } from "@/components/custom/icons"
import PageLayout from "@/components/custom/layouts/page"

export default async function Page() {
  const user = await getUserByEmail()

  return (
    <PageLayout>
      <div className="w-full max-w-screen-md space-y-6">
        <div className="grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        {/* <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          <Link href="#">Preferences</Link>
          <Link href="#">Appearence</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
      </div> */}
        <div className="grid w-full gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Info</CardTitle>
              <CardDescription>
                Basic information about your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label>Account ID</Label>
                <p>{user?.id || "-"}</p>
              </div>
              <div className="space-y-1">
                <Label>Email ID</Label>
                <p>{user?.email || "-"}</p>
              </div>
              <div className="space-y-1">
                <Label>Identity Providers</Label>
                <div className="flex gap-4">
                  {user?.providers.map((p, i) => (
                    <div className="rounded-md border p-3" key={i}>
                      {p.name === "google" ? (
                        <GoogleIcon />
                      ) : (
                        <EnvelopeClosedIcon width={22} height={22} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Joined At</Label>
                <p>
                  {(user?.created_at &&
                    format(new Date(user?.created_at), "Pp")) ||
                    "-"}
                </p>
              </div>
            </CardContent>
            {/* <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter> */}
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                This will reset password for this account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant={"outline"}>Reset Password</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                This will permanently delete your account after 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant={"destructive"}>
                Permanently Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
