import "server-only"

import { headers } from "next/headers"
import { z } from "zod"

import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

export const getAllInvitations = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org } = await hasPerm({ orgSlug })

  const result = await db
    .selectFrom("orgs.invitation")
    .where("org_id", "=", org!.id)
    .selectAll()
    .orderBy("invited_at asc")
    .execute()

  return { items: result }
}
