import "server-only"

import { headers } from "next/headers"
import employeeSchema from "@/schema/employee"
import { z } from "zod"

import { db } from "../db"

export const getAllInvitations = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org } = await employeeSchema.invite.read.permission(orgSlug)
  const result = await db
    .selectFrom("orgs.invitation")
    .where("org_id", "=", org!.id)
    .selectAll()
    .orderBy("invited_at desc")
    .execute()

  return { items: result }
}
