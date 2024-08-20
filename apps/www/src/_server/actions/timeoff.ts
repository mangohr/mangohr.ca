"use server"

import { headers } from "next/headers"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import attendanceSchema from "@/schema/attendance"
import { orgSlugSchema } from "@/schema/default"
import { Expression, sql, SqlBool } from "kysely"

export const getAllTimeOffs = async (props: { searchParams: unknown }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const parsed = attendanceSchema.list.read.validate.parse(props.searchParams)
  const { org } = await hasPerm({ orgSlug })
  const query = db
    .selectFrom("orgs.time_off as t")
    .leftJoin("orgs.employee as e", "e.id", "t.employee_id")
    .leftJoin("auth.user as u", "u.id", "e.user_id")
    .select([
      "t.id",
      "t.cost",
      "t.start_date",
      "t.end_date",
      "t.type",
      "t.request_reason",
      "t.reject_reason",
      "t.status",
      "t.created_at",
      sql<string>`trim(COALESCE(first_name, '') || ' ' || COALESCE(middle_name, '') || COALESCE(last_name, ''))`.as(
        "name"
      ),
      "u.username",
      "u.image",
    ])
    .where((eb) => {
      const filters: Expression<SqlBool>[] = []
      filters.push(eb("t.org_id", "=", org!.id))

      if (parsed.search) {
        const searchConditions = [
          eb("e.work_email", "ilike", `%${parsed.search!}%`),
          eb("e.first_name", "ilike", `%${parsed.search!}%`),
          eb("e.last_name", "ilike", `%${parsed.search!}%`),
          eb("e.middle_name", "ilike", `%${parsed.search!}%`),
        ]

        if (Number(parsed.search)) {
          searchConditions.push(eb("e.id", "=", parsed.search!))
        }

        filters.push(eb.or(searchConditions))
      }
      if (parsed.filters.length > 0) {
        parsed.filters.forEach((f) => {
          f.value && filters.push(eb(f.id as any, "=", f.value))
        })
      }

      return eb.and(filters)
    })
  if (parsed.sort.length > 0) {
    const oq = parsed.sort.map(
      (f) => `${f.id} ${f.desc ? "desc" : "asc"}`
    ) as any
    query.orderBy(oq)
  } else {
    query.orderBy(["t.created_at desc"])
  }

  const result = await query
    .limit(parsed.limit)
    .offset(parsed.page * parsed.limit)
    .execute()

  return { items: result, hasMore: result.length === parsed.limit }
}
