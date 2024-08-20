import { headers } from "next/headers"
import { dateSchema } from "@/schema/default"
import { sql } from "kysely"
import { z } from "zod"

import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

export const getDashboardData = async (data: {
  startDate: string
  endDate: string
}) => {
  const { startDate, endDate } = z
    .object({ startDate: dateSchema, endDate: dateSchema })
    .parse(data)

  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await hasPerm({ orgSlug })

  const [
    totalAttendance,
    totalEmployees,
    totalTimeOffs,
    recentLeaveRequests,
    topEmployees,
    employmentTypes,
  ] = await Promise.all([
    // Total Attendance
    db
      .selectFrom((eb) =>
        eb
          .selectFrom("orgs.attendance")
          .select([
            "id",
            "login",
            sql<string>`(CAST(EXTRACT(EPOCH FROM (COALESCE(logout, CURRENT_TIMESTAMP) - login)) AS INTEGER) / 3600)`.as(
              "hours"
            ),
          ])
          .where("org_id", "=", org!.id)
          .where("login", ">=", startDate as any)
          .where("login", "<=", endDate as any)
          .as("e")
      )
      .select([
        sql<string>`TO_CHAR(e.login, 'DD/MM/YYYY')`.as("date"),
        sql<string>`SUM(e.hours)`.as("p1"),
        sql<string>`COUNT(e.id)`.as("p2"),
      ])
      .groupBy("e.login")
      .execute(),

    // Total Employees
    db
      .selectFrom("orgs.employee as e")
      .select([
        sql<string>`TO_CHAR(e.hired_at, 'DD/MM/YYYY')`.as("date"),
        sql<string>`COUNT(e.id)`.as("p1"),
      ])
      .where("e.hired_at", ">=", startDate as any)
      .where("e.hired_at", "<=", endDate as any)
      .where("e.org_id", "=", org!.id)
      .groupBy("e.hired_at")
      .execute(),

    // Time off Requests
    db
      .selectFrom("orgs.time_off as t")
      .select([
        sql<string>`TO_CHAR(t.created_at, 'DD/MM/YYYY')`.as("date"),
        sql<string>`COUNT(t.id)`.as("p1"),
      ])
      .where("t.created_at", ">=", startDate as any)
      .where("t.created_at", "<=", endDate as any)
      .where("org_id", "=", org!.id)
      .groupBy("t.created_at")
      .execute(),

    // Pending Leave Requests
    db
      .selectFrom("orgs.time_off as t")
      .innerJoin("orgs.employee as e", "e.id", "t.employee_id")
      .innerJoin("auth.user as u", "u.id", "e.user_id")
      .select([
        "image",
        "name",
        "e.id",
        "start_date",
        "end_date",
        "cost",
        "status",
        "username",
      ])
      .where("t.org_id", "=", org!.id)
      .where("t.created_at", ">=", startDate as any)
      .where("t.created_at", "<=", endDate as any)
      .limit(5)
      .orderBy(
        sql`
        CASE WHEN status = 'pending' THEN 1
        ELSE 2 END, 
        t.created_at DESC`
      )
      .execute(),

    // Top Employees Attendance
    db
      .selectFrom("orgs.attendance as a")
      .innerJoin("orgs.employee as e", "e.id", "a.employee_id")
      .innerJoin("auth.user as u", "u.id", "e.user_id")
      .select([
        "name",
        "username",
        sql<string>`SUM((CAST(EXTRACT(EPOCH FROM (COALESCE(logout, CURRENT_TIMESTAMP) - login)) AS INTEGER) / 3600))`.as(
          "hours"
        ),
      ])
      .where("a.org_id", "=", org!.id)
      .where("login", ">=", startDate as any)
      .where("login", "<=", endDate as any)
      .limit(5)
      .groupBy(["username", "name"])
      .orderBy(["hours desc"])
      .limit(5)
      .execute(),
    // Employee type
    db
      .selectFrom("orgs.employee as e")
      .leftJoin("orgs.job as j", "j.id", "e.current_job")
      .select([
        sql<string>`COUNT(e.id)`.as("count"),
        sql<string>`COALESCE(NULLIF(type, ''), 'un_assigned')`.as("type"),
      ])
      .where("e.org_id", "=", org!.id)
      .groupBy("type")
      .execute(),
  ])
  return {
    topEmployees,
    totalAttendance,
    totalEmployees,
    totalTimeOffs,
    recentLeaveRequests,
    employmentTypes,
  }
}
