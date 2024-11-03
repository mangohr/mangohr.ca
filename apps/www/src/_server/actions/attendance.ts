"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import attendanceSchema from "@/schema/attendance"
import { orgSlugSchema } from "@/schema/default"
import { Expression, sql, SqlBool } from "kysely"
import { z } from "zod"

import { getEmployee } from "../cache/org"

export const getAllAttendance = async (props: { searchParams: unknown }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const parsed = attendanceSchema.list.read.validate.parse(props.searchParams)
  const { org } = await hasPerm({ orgSlug })
  const query = db
    .selectFrom("orgs.attendance as a")
    .leftJoin("orgs.employee as e", "e.id", "a.employee_id")
    .leftJoin("auth.user as u", "u.id", "e.user_id")
    .select([
      "a.id",
      "a.login",
      "a.logout",
      "u.image",
      "u.username",
      sql<string>`trim(COALESCE(first_name, '') || ' ' || COALESCE(middle_name, '') || COALESCE(last_name, ''))`.as(
        "name"
      ),
    ])
    .where((eb) => {
      const filters: Expression<SqlBool>[] = []
      filters.push(eb("a.org_id", "=", org!.id))

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
    query.orderBy(["a.login desc"])
  }

  const result = await query
    .limit(parsed.limit)
    .offset(parsed.page * parsed.limit)
    .execute()

  return { items: result, hasMore: result.length === parsed.limit }
}

export const adminAddAttendance = async (
  props: z.infer<typeof attendanceSchema.add.validate>
) => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const {
    employee: emp_username,
    login,
    logout,
  } = attendanceSchema.add.validate.parse(props)

  const { session, org } = await hasPerm({ orgSlug })

  let emp = session.employee

  if (session.user.username !== emp_username) {
    emp = await getEmployee(org!.id, emp_username)
  }
  if (!emp || !emp?.user_id) throw new Error("Employee not found!")

  const data = await db
    .insertInto("orgs.attendance")
    .values({
      logout,
      login,
      employee_id: emp.id,
      org_id: org!.id,
    })
    .returning(["id"])
    .executeTakeFirstOrThrow()
    .catch(() => {
      throw new Error("Failed to add attendance!")
    })

  // revalidatePath("/org/[orgSlug]/attendance", "page")
  return data
}
