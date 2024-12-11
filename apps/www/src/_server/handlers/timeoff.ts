import "server-only"

import { headers } from "next/headers"
import { orgSlugSchema } from "@/schema/default"
import { timeoffSchema } from "@/schema/timeoff"
import { z } from "zod"

import { db } from "../db"

export const getEmployeeTimeOff = async (params: {
  userName: string
  orgSlug: string
}) => {
  const { orgSlug, userName } = z
    .object({ orgSlug: orgSlugSchema, userName: z.string() })
    .parse(params)

  const { org } = await timeoffSchema.list.read.permission(orgSlug)

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

export const getTimeOffChart = async (
  params: z.infer<typeof timeoffSchema.list.chart.validate>
) => {
  const { start, end } = timeoffSchema.list.chart.validate.parse(params)

  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org } = await timeoffSchema.list.read.permission(orgSlug)

  const result = await db
    .selectFrom("orgs.time_off as t")
    .select(["t.start_date as date", db.fn.count("start_date").as("value")])
    .where("t.org_id", "=", org!.id)
    .where("t.start_date", ">=", new Date(start))
    .where("t.start_date", "<=", new Date(end))
    .groupBy("t.start_date")
    .execute()
  return result
}
