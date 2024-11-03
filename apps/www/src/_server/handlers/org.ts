"use server"

import "server-only"

import { headers } from "next/headers"
import { z } from "zod"

import { nullsToUndefined } from "@/lib/utils"

import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"

export const getAllOrgs = async () => {
  const { session } = await hasPerm()
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

  console.log(result)

  return result
}

export const getSingleOrg = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await hasPerm({ orgSlug })

  return nullsToUndefined(org)
}

export const getOffices = async () => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { org } = await hasPerm({ orgSlug })

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

  const { org } = await hasPerm({ orgSlug })

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
  const { org } = await hasPerm({ orgSlug })
  const result = await db
    .selectFrom("orgs.work_schedule")
    .where("org_id", "=", org!.id)
    .selectAll()
    .orderBy("created_at desc")
    .execute()

  return { items: nullsToUndefined(result) }
}
