"use server"

import "server-only"

import { headers } from "next/headers"
import departmentSchema from "@/schema/department"
import officeSchema from "@/schema/office"
import orgSchema from "@/schema/org"
import workScheduleSchema from "@/schema/work-schedule"
import { z } from "zod"

import { nullsToUndefined } from "@/lib/utils"

import { db } from "../db"

export const getAllOrgs = async () => {
  const { session } = await orgSchema.list.permission()
  const [result] = await Promise.all([
    db
      .selectFrom("orgs.employee as e")
      .leftJoin("orgs.list", "orgs.list.id", "e.org_id")
      .where("e.user_id", "=", session.user.id)
      .select([
        "orgs.list.name",
        "orgs.list.created_at",
        "orgs.list.id",
        "orgs.list.slug",
      ])
      .orderBy("created_at desc")
      .execute(),
  ])

  return result
}

export const getSingleOrg = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await orgSchema.get.permission(orgSlug)

  return nullsToUndefined(org)
}

export const getOffices = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await officeSchema.get.permission(orgSlug)

  const offices = await db
    .selectFrom("orgs.office")
    .where("orgs.office.org_id", "=", org!.id)
    .select([
      "orgs.office.id",
      "orgs.office.email",
      "orgs.office.phone",
      "orgs.office.name",
      "orgs.office.location",
      "orgs.office.active",
    ])
    .orderBy("orgs.office.created_at desc")
    .execute()

  return { items: nullsToUndefined(offices) }
}

export const getDepartments = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await departmentSchema.get.permission(orgSlug)

  const departments = await db
    .selectFrom("orgs.department as d")
    .where("d.org_id", "=", org!.id)
    .select(["d.id", "d.name", "d.created_at"])
    .orderBy("d.created_at desc")
    .execute()

  return { items: nullsToUndefined(departments) }
}

export const getWorkSchedules = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org } = await workScheduleSchema.get.permission(orgSlug)

  const result = await db
    .selectFrom("orgs.work_schedule")
    .where("org_id", "=", org!.id)
    .selectAll()
    .orderBy("created_at desc")
    .execute()

  return { items: nullsToUndefined(result) }
}
