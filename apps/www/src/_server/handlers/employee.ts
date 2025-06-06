import "server-only"

import { headers } from "next/headers"
import { orgSlugSchema } from "@/schema/default"
import employeeSchema from "@/schema/employee"
import { sql } from "kysely"
import { jsonBuildObject } from "kysely/helpers/postgres"
import { z } from "zod"

import { nullsToUndefined } from "@/lib/utils"

import { db } from "../db"

export const getAllEmployeesRoles = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await employeeSchema.role.read.permission(orgSlug)
  const [result, roles] = await Promise.all([
    db
      .selectFrom("orgs.employee as e")
      .where("org_id", "=", org!.id)
      .innerJoin("auth.user", "auth.user.id", "e.user_id")
      .select([
        "e.id",
        "scopes",
        "auth.user.image",
        sql<string>`trim(COALESCE(e.first_name, '') || ' ' || COALESCE(e.last_name, ''))`.as(
          "name"
        ),
        "auth.user.username",
        "roles",
      ])
      .orderBy("hired_at desc")
      .execute(),
    db
      .selectFrom("orgs.employee")
      .where("org_id", "=", org!.id)
      .select([sql<string>`COUNT(id)`.as("count"), "roles"])
      .groupBy("roles")
      .execute(),
  ])

  return { items: result, roles }
}

export const getEmployeeData = async (params: {
  userName: string
  orgSlug: string
}) => {
  const { orgSlug, userName } = z
    .object({ orgSlug: orgSlugSchema, userName: z.string() })
    .parse(params)

  const { org } = await employeeSchema.general.get.permission(orgSlug)

  const result = await db
    .selectFrom("orgs.employee as e")
    .innerJoin("auth.user as u", "u.id", "user_id")
    .leftJoin("orgs.office as o", "o.id", "e.office")
    .leftJoin("orgs.department as d", "d.id", "department")
    .leftJoin(
      (eb) =>
        eb
          .selectFrom("orgs.job as sj")
          .leftJoin("orgs.employee as se", "se.id", "sj.reports_to")
          .leftJoin("auth.user as su", "su.id", "se.user_id")
          .select((eb) => [
            "sj.id",
            "sj.title",
            "sj.type",
            jsonBuildObject({
              name: eb.ref("su.name"),
              image: eb.ref("su.image"),
            }).as("reports_to"),
          ])
          .as("cj"),
      (join) => join.onRef("cj.id", "=", "e.current_job")
    )

    .select((eb) => [
      "u.image",
      "first_name",
      "middle_name",
      "last_name",
      "date_of_birth",
      "work_email",
      "e.phone",
      "address",
      "marital_status",
      "gender",
      "emergency_contacts",
      "e.roles",
      eb.fn.toJson("d").as("department"),
      eb.fn.toJson("o").as("office"),
      eb.fn.toJson("cj").as("current_job"),
    ])
    .where("u.username", "=", userName)
    .where("e.org_id", "=", org!.id)
    .executeTakeFirstOrThrow()
    .catch(() => {
      throw Error("Employee data not found!")
    })

  return nullsToUndefined(result)
}
