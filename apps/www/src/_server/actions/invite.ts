"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import employeeSchema from "@/schema/employee"
import { z } from "zod"

export const inviteEmployeeAction = async (data: string) => {
  const parsed = employeeSchema.invite.create.validate.parse(data)
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org, session } = await hasPerm({ orgSlug })

  await db
    .insertInto("orgs.invitation")
    .values({
      email: parsed.general.work_email,
      status: "pending",
      org_id: org!.id,
      invited_by: session.user.id,
      data: parsed,
    })
    .execute()

  return redirect("/org/invitations")
}
