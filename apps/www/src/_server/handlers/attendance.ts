import "server-only"

import { orgSlugSchema } from "@/schema/default"
import { z } from "zod"

import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

export const getEmployeeAttendance = async (params: {
  userName: string
  orgSlug: string
}) => {
  const { orgSlug, userName } = z
    .object({ orgSlug: orgSlugSchema, userName: z.string() })
    .parse(params)

  const { org } = await hasPerm({ orgSlug })

  const result = await db
    .selectFrom("orgs.attendance as a")
    .innerJoin("orgs.employee as e", "e.id", "a.employee_id")
    .innerJoin("auth.user as u", "u.id", "e.user_id")
    .where("a.org_id", "=", org!.id)
    .where("u.username", "=", userName)
    .selectAll("a")
    .limit(50)
    .orderBy("a.login desc")
    .execute()

  let latestAttendance = null

  for (const r of result) {
    if (r.logout === null) {
      latestAttendance = r
      break
    }
  }

  return { history: result, latestAttendance }
}
