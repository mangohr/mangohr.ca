import "server-only"

import { orgSlugSchema } from "@/schema/default"
import { z } from "zod"

import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

export const getEmployeeTimeOff = async (params: {
  userName: string
  orgSlug: string
}) => {
  const { orgSlug, userName } = z
    .object({ orgSlug: orgSlugSchema, userName: z.string() })
    .parse(params)

  const { org } = await hasPerm({ orgSlug })

  const result = await db
    .selectFrom("orgs.time_off as t")
    .innerJoin("orgs.employee as e", "e.id", "t.employee_id")
    .innerJoin("auth.user as u", "u.id", "e.user_id")
    .where("t.org_id", "=", org!.id)
    .where("u.username", "=", userName)
    .selectAll("t")
    .orderBy("created_at desc")
    .execute()

  return result
}
