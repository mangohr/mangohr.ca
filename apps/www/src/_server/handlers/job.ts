import { orgSlugSchema } from "@/schema/default"

import "server-only"

import { sql } from "kysely"
import { z } from "zod"

import { getEmployee } from "../cache/org"
import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

export const getEmployeeJobs = async (params: {
  userName: string
  orgSlug: string
}) => {
  const { orgSlug, userName } = z
    .object({ orgSlug: orgSlugSchema, userName: z.string() })
    .parse(params)

  const { org, session } = await hasPerm({ orgSlug })

  let emp = undefined

  if (session.user.username === userName) {
    emp = session.employee
  } else {
    emp = await getEmployee(org!.id, userName)
  }
  const result = await db
    .selectFrom("orgs.job as j")
    .leftJoin("orgs.employee as e", "e.id", "j.reports_to")
    .where("j.org_id", "=", org!.id)
    .where("j.employee_id", "=", emp!.id)
    .select([
      "title",
      "type",
      "start_date",
      "end_date",
      sql<string>`trim(COALESCE(first_name, '') || ' ' || COALESCE(middle_name, '') || COALESCE(last_name, ''))`.as(
        "reports_to"
      ),
    ])
    .execute()

  return result
}
