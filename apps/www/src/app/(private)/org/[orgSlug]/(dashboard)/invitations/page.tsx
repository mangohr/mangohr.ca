import React from "react"
import { getAllInvitations } from "@/_server/handlers/invitation"

import PageLayout from "@/components/custom/layouts/page"

export default async function Page() {
  const invitations = await getAllInvitations()

  return (
    <PageLayout>
      <div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invitations</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of people invited to your organization.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
