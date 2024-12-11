"use server"

import { headers } from "next/headers"
import { db } from "@/_server/db"
import { orgSlugSchema } from "@/schema/default"
import { timeoffSchema } from "@/schema/timeoff"
import { addDays } from "date-fns"
import { Expression, sql, SqlBool } from "kysely"
import { z } from "zod"

import { getEmployee } from "../cache/org"

export const getAllTimeOffs = async (props: { searchParams: unknown }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const parsed = timeoffSchema.list.read.validate.parse(props.searchParams)
  const { org } = await timeoffSchema.list.read.permission(orgSlug)
  const query = db
    .selectFrom("orgs.time_off as t")
    .leftJoin("orgs.employee as e", "e.id", "t.employee_id")
    .leftJoin("auth.user as u", "u.id", "e.user_id")
    .leftJoin("auth.user as ab", "ab.id", "t.action_by")
    .select([
      "t.id",
      "t.cost",
      "t.start_date",
      "t.end_date",
      "t.type",
      "t.request_reason",
      "t.action_message",
      "t.status",
      "t.created_at",
      "ab.username as action_username",
      "ab.name as action_name",
      "ab.image as action_image",
      sql<string>`trim(COALESCE(first_name, '') || ' ' || COALESCE(middle_name, '') || ' ' || COALESCE(last_name, ''))`.as(
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

export const createTimeOff = async (
  props: z.infer<typeof timeoffSchema.create.validate>
) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const { employee: emp_username, ...data } =
    timeoffSchema.create.validate.parse(props)
  const { org, session } = await timeoffSchema.create.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== emp_username) {
    emp = await getEmployee(org!.id, emp_username)
  }
  if (!emp || !emp?.user_id) throw new Error("Employee not found!")

  const end_date = addDays(data.start_date, data.cost)
  await db
    .insertInto("orgs.time_off")
    .values({
      ...data,
      end_date,
      employee_id: emp!.id,
      org_id: emp.org_id,
    })
    .execute()
  return true
}

export const approveTimeOff = async (
  props: z.infer<typeof timeoffSchema.approve.validate>
) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const {
    employee: emp_username,
    action,
    message,
    request: timeoff_id,
  } = timeoffSchema.approve.validate.parse(props)
  const { org, session } = await timeoffSchema.approve.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== emp_username) {
    emp = await getEmployee(org!.id, emp_username)
  }
  if (!emp || !emp?.user_id) throw new Error("Employee not found!")

  await db
    .updateTable("orgs.time_off")
    .set({
      status: action,
      action_message: message,
      action_by: session.user.id,
    })
    .where("employee_id", "=", emp!.id)
    .where("org_id", "=", org!.id)
    .where("id", "=", timeoff_id)
    .execute()
  return true
}
// export const updateTimeOff = async (
//   props: z.infer<typeof timeoffSchema.create.validate>
// ) => {
//   const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
//   const { employee: emp_username, ...data } =
//     timeoffSchema.create.validate.parse(props)

//   let emp = session.employee

//   if (session.user.username !== emp_username) {
//     emp = await getEmployee(org!.id, emp_username)
//   }
//   if (!emp || !emp?.user_id) throw new Error("Employee not found!")

//   const end_date = addDays(data.start_date, data.cost)
//   await db
//     .insertInto("orgs.time_off")
//     .values({
//       ...data,
//       end_date,
//       employee_id: emp!.id,
//       org_id: emp.org_id,
//     })
//     .execute()
// }
