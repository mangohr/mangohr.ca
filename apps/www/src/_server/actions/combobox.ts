"use server"

import { headers } from "next/headers"
import { Expression, sql, SqlBool } from "kysely"
import { z } from "zod"

import { nullsToUndefined } from "@/lib/utils"

import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

const schema = z.object({ search: z.string().optional() })

export const getEmployeesComboBox = async (params: { search: string }) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { search } = schema.parse(params)
  const { org } = await hasPerm({ orgSlug })

  const data = await db
    .selectFrom("orgs.employee as e")
    .innerJoin("auth.user as u", "u.id", "e.user_id")
    .where((eb) => {
      const filters: Expression<SqlBool>[] = []

      filters.push(eb("org_id", "=", org!.id))
      if (search) {
        const searchConditions = [
          eb("e.first_name", "ilike", `%${search!}%`),
          eb("e.last_name", "ilike", `%${search!}%`),
          eb("e.work_email", "ilike", `%${search!}%`),
          eb("u.username", "ilike", `%${search!}%`),
        ]

        filters.push(eb.or(searchConditions))
      }
      return eb.and(filters)
    })
    .select([
      "username as value",
      sql<string>`trim(COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))`.as(
        "label"
      ),
      "u.image",
    ])
    .limit(10)
    .execute()

  data.forEach((d) => {
    if (!d.image) {
      d.image = `https://api.dicebear.com/9.x/initials/svg?seed=${d.label.replaceAll(" ", "_")}`
    }
  })

  return nullsToUndefined(data)
}
